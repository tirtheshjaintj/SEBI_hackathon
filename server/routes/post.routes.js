const express = require("express");
const router = express.Router();

const communityController = require("../controllers/post.js");
const { authMiddleware } = require("../middlewares/auth.js"); // replace path if different

// Multer config: store files temporarily before uploading to Cloudinary
const upload = require("../middlewares/multer");

/**
 * Create a new post with photos
 * photos field in form-data: 'photos' (array)
 */
router.post(
  "/",
  authMiddleware,
  upload.single("file"), // adjust max number if needed
  communityController.createPost
);

// Toggle upvote
router.post(
  "/:postId/toggle-upvote",
  authMiddleware,
  communityController.toggleUpvotePost
);

// Comment on a post
router.post(
  "/:postId/comment",
  authMiddleware,
  communityController.commentOnPost
);

// Get a single post with votes & comments
router.get("/:postId", authMiddleware, communityController.getPost);

// Get all posts with votes & comments
router.get("/", authMiddleware, communityController.getAllPosts);

module.exports = router;
