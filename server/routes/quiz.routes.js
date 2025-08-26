const express = require("express");
const router = express.Router();
const {
  addQuiz,
  submitAnswer,
  deleteQuiz,
  getAllQuizzes,
  getAllLevelsSummary,
  addQuizzes
 } = require("../controllers/quiz.js");
const { authMiddleware } = require("../middlewares/auth.js");
router.post("/", authMiddleware, addQuiz);
router.post("/submit", authMiddleware, submitAnswer);
router.delete("/:id", authMiddleware, deleteQuiz);
router.get("/", authMiddleware, getAllQuizzes);
router.get("/levels", authMiddleware, getAllLevelsSummary);
router.post("/add", authMiddleware, addQuizzes);
module.exports = router;
