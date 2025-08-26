const mongoose = require("mongoose");

const merchandiseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  redeemPoints: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  status: { type: String, enum: ["active", "inactive"], required: true },
});

module.exports = mongoose.model("Merchandise", merchandiseSchema);
