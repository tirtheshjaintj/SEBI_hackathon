const mongoose = require("mongoose");

const ActivityHistorySchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    QuidId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    selected_option: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityHistory", ActivityHistorySchema);
