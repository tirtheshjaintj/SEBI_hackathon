const mongoose = require("mongoose");

const redeemMerchandiseSchema = new mongoose.Schema(
  {
    merchandiseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchandise",
      required: true,
    },
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RedeemMerchandise", redeemMerchandiseSchema);
