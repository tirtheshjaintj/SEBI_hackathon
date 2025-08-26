const CommunityPost = require("../models/CommunityPost.js");
const Vote = require("../models/Vote.js");
const Comment = require("../models/Comment.js");
const { uploadToCloudinary } = require("../utils/cloudinary.js");

/**
 * Create a new post with photo uploads
 */
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user._id;

    // Validate content
    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Post content is required",
      });
    }

    if (content.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Post content is too long (max 2000 characters)",
      });
    }

    let photoUrls = [];

    console.log("File:", req.file);

    if (req.file) {
      const maxFileSize = 5 * 1024 * 1024; // 5MB
      if (req.file.size > maxFileSize) {
        return res.status(400).json({
          success: false,
          message: "File too large. Max 5MB allowed.",
        });
      }

      try {
        const uploaded = await uploadToCloudinary(req.file.buffer);
        if (uploaded && uploaded.secure_url) {
          photoUrls.push(uploaded.secure_url);
        } else {
          console.warn("Upload returned no URL");
        }
      } catch (err) {
        console.error("Cloudinary upload error:", err);
        return res.status(500).json({
          success: false,
          message: "Error uploading image",
        });
      }
    }

    const newPost = await CommunityPost.create({
      content,
      user: userId,
      photos: photoUrls, // array of URLs, empty if no file uploaded
    });

    await newPost.populate("user", "username avatar");

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating post",
    });
  }
};

/**
 * Toggle upvote on a post
 */
exports.toggleUpvotePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;

    const existingVote = await Vote.findOne({ postid: postId, userid: userId });

    if (existingVote) {
      // User already voted → remove vote (unvote)
      await existingVote.deleteOne();
      return res.status(200).json({ success: true, message: "Vote removed" });
    } else {
      // Not voted yet → add vote
      const vote = await Vote.create({ postid: postId, userid: userId });
      return res
        .status(201)
        .json({ success: true, message: "Vote added", vote });
    }
  } catch (error) {
    console.error("Error toggling vote:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Comment on a post
 */
exports.commentOnPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const comment = await Comment.create({
      content,
      postid: postId,
      userid: userId,
    });

    res.status(201).json({ success: true, comment });
  } catch (error) {
    console.error("Error commenting on post:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Get a single post with votes and comments
 */
exports.getPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await CommunityPost.findById(postId).populate(
      "user",
      "username name"
    ); // adjust fields
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const votes = await Vote.find({ postid: postId }).populate(
      "userid",
      "username"
    );
    const comments = await Comment.find({ postid: postId }).populate(
      "userid",
      "username"
    );

    res.status(200).json({ success: true, post, votes, comments });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * Get all posts with their votes and comments
 */
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find()
      .populate("user", "username name")
      .sort({ createdAt: -1 });

    // Fetch votes and comments for each post
    const data = await Promise.all(
      posts.map(async (post) => {
        const votes = await Vote.find({ postid: post._id }).populate(
          "userid",
          "username"
        );
        const comments = await Comment.find({ postid: post._id }).populate(
          "userid",
          "username"
        );
        return { post, votes, comments };
      })
    );

    res.status(200).json({ success: true, posts: data });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
