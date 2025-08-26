const { Schema, model } = require("mongoose");

const BudgetExpenseSchema = new Schema(
  {
    budgetId: {
      type: Schema.Types.ObjectId,
      ref: "Budget",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("BudgetExpense", BudgetExpenseSchema);
