const mongoose = require("mongoose");

const merchandisTransSchema = new mongoose.Schema({
  merchandiseId: {
    ref: "Merchandise",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  language: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("MerchandiseTrans", merchandisTransSchema);
