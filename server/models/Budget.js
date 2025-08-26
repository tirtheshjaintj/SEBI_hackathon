const { Schema, model } = require("mongoose");

const budgetSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    expenses: [
      {
        expenseId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "BudgetExpense",
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const budgetModel = model("Budget", budgetSchema);

module.exports = budgetModel;
