const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema(
  {
    postid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CommunityPost',
      required: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// Optional: prevent duplicate votes by the same user on the same post
voteSchema.index({ postid: 1, userid: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);
