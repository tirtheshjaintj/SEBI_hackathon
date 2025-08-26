const BudgetExpense = require("../models/BudgetExpense");
const Budget = require("../models/Budget.js");

exports.addOrUpdateAmount = async (req, res) => {
  try {
    const userId = req.user._id;
    const { amount } = req.body;

    if (!amount || typeof amount !== "number" || amount < 0) {
      return res.status(400).json({ message: "Valid amount is required" });
    }

    let budget = await Budget.findOne({ user_id: userId });

    if (!budget) {
      // Create a new budget if not found
      budget = await Budget.create({
        user_id: userId,
        totalAmount: amount,
        expenses: [],
      });
    } else {
      // Update the totalAmount
      budget.totalAmount = amount;
      await budget.save();
    }

    res.json({ success: true, totalAmount: budget.totalAmount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update amount" });
  }
};

exports.getBudgetDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    const { cycle = "monthly" } = req.query;
    const budget = await Budget.findOne({ user_id: userId });

    const now = new Date();
    let fromDate;

    if (cycle === "daily") {
      fromDate = new Date(now);
      fromDate.setHours(0, 0, 0, 0);
    } else if (cycle === "weekly") {
      fromDate = new Date(now);
      fromDate.setDate(now.getDate() - 7);
    } else {
      fromDate = new Date(now);
      fromDate.setDate(now.getDate() - 30);
    }

    if (!budget) {
      return res.status(200).json({
        success: true,
        message: "No budget found for user.",
        cycle,
        fromDate: null,
        toDate: null,
        totalIncome: 0,
        totalExpenses: 0,
        remaining: 0,
        expenses: [],
      });
    }

    const expenses = await BudgetExpense.find({
      budgetId: budget._id,
      createdAt: { $gte: fromDate, $lte: now },
    }).sort({ createdAt: -1 });

    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalIncome = budget.totalAmount ?? 0;

    res.json({
      success: true,
      cycle,
      fromDate,
      toDate: now,
      totalIncome,
      totalExpenses,
      remaining: totalIncome - totalExpenses,
      expenses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch budget details" });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    const { amount, category, description } = req.body;

    const expense = await BudgetExpense.findById(req.params.expenseId);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    const budget = await Budget.findOne({
      _id: expense.budgetId,
      user_id: userId,
    });
    if (!budget)
      return res.status(403).json({ message: "Unauthorized access" });

    // Update the expense
    expense.amount = amount ?? expense.amount;
    expense.category = category ?? expense.category;
    expense.description = description ?? expense.description;
    await expense.save();

    // Update budget expenses array and total
    const expItem = budget.expenses.find(
      (e) => e.expenseId.toString() === expense._id.toString()
    );
    if (expItem) expItem.amount = amount;
    budget.totalAmount = budget.expenses.reduce((sum, e) => sum + e.amount, 0);
    await budget.save();

    res.json({ success: true, expense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update expense" });
  }
};

exports.createExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    const { amount, category, description } = req.body;

    // Find the user's budget
    const budget = await Budget.findOne({ user_id: userId });
    if (!budget)
      return res.status(400).json({ message: "Budget not found for user" });

    // Create the new expense
    const expense = await BudgetExpense.create({
      amount,
      category,
      description,
      budgetId: budget._id,
      user_id: userId,
    });

    // Push to budget's expenses array with local amount
    budget.expenses.push({ expenseId: expense._id, amount });
    await budget.save();

    res.status(201).json({ success: true, expense });
  } catch (err) {
    console.error("Error creating expense:", err);
    res.status(500).json({ message: "Failed to create expense" });
  }
};
