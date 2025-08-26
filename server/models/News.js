const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  data: { type: Object, required: true },
  langauge: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('News', NewsSchema);
