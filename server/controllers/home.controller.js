const Budget = require("../models/Budget");

exports.getHomeScreenData = async (req, res) => {
  try {
    const budget = await Budget.findOne({ user_id: req.user._id })
      .populate("expenses.expenseId")
      .lean();

    let totalBudget = 0;
    let totalSpent = 0;
    let totalRemaining = 0;

    if (budget) {
      totalBudget = budget.totalAmount || 0;
      totalSpent = budget.expenses?.reduce(
        (sum, exp) => sum + (exp.amount || 0),
        0
      );
      totalRemaining = totalBudget - totalSpent;
    }

    res.status(200).json({
      message: "Welcome to Home Screen",
      budget: {
        totalBudget,
        totalSpent,
        totalRemaining,
        expenses: budget?.expenses || [],
      },
    });
  } catch (error) {
    console.error("Error fetching budget:", error);
    res.status(500).json({
      message: "Failed to fetch home screen data",
      error: error.message,
    });
  }
};
