const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["created", "authorized", "captured", "failed", "refunded"],
      required: true,
    },
    receiptId: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      // required: true,
    },

    razorpay_order_id: {
      type: String,
      required: true,
    },

    razorpay_signature: {
      type: String,
      // required: true,
    },

    amount: {
      type: Number,
    },

    currency: {
      type: String,
      default: "INR",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
