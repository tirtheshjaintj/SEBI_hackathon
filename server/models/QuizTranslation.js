const mongoose = require("mongoose");

const QuizTranslationSchema = new mongoose.Schema({
  qid: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  language: { type: String, required: true }, // e.g., 'hi', 'es', etc.
  question: { type: String , required: true},
  options: { type: Array , required: true},
  topic: { type: String },
});

module.exports = mongoose.model("QuizTranslation", QuizTranslationSchema);
