const { Router } = require("express");
const { authMiddleware } = require("../middlewares/auth.js"); // replace path if different
const {
  getBudgetDetails,
  updateExpense,
  addOrUpdateAmount,
  createExpense,
} = require("../controllers/budget.controller");

const budgetRoutes = Router();

budgetRoutes.post("/expense", authMiddleware, createExpense);
budgetRoutes.put("/expense", authMiddleware, updateExpense);
budgetRoutes.get("/", authMiddleware, getBudgetDetails);
budgetRoutes.post("/", authMiddleware, addOrUpdateAmount);


module.exports = budgetRoutes;
