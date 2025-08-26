const mongoose = require('mongoose');

const communityPostSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    photos: [
      {
        type: String, // URL or filename
      },
    ],
    tags:{
      type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('CommunityPost', communityPostSchema);
