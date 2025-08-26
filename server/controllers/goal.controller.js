const asyncHandler = require("express-async-handler");
const GoalModel = require("../models/goal.models");

// Create a new goal
const createGoal = asyncHandler(async (req, res) => {
    const { title, description, targetAmount, currentAmount, targetDays, category, priority } = req.body;

    if (!title || !targetAmount || !targetDays) {
        res.status(400);
        throw new Error("Title, targetAmount, and targetDays are required");
    }

    const goal = await GoalModel.create({
        user_id: req.user._id,
        title,
        description,
        targetAmount,
        currentAmount: currentAmount || 0,
        targetDays,
        category,
        priority
    });

    res.status(201).json(goal);
});

// Get all goals (with optional filters)
const getGoals = asyncHandler(async (req, res) => {
    const filters = { user_id: req.user._id };
    const { status, category, priority, type } = req.query;

    if (status) filters.status = status;
    if (category) filters.category = category;
    if (priority) filters.priority = priority;

    let goals = await GoalModel.find(filters).sort({ createdAt: -1 });

    if (type) {
        goals = goals.filter(goal => goal.type === type);
    }

    res.status(200).json(goals);
});

// Get single goal
const getGoalById = asyncHandler(async (req, res) => {
    const goal = await GoalModel.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!goal) {
        res.status(404);
        throw new Error("Goal not found");
    }
    res.status(200).json(goal);
});

// Update any fields
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await GoalModel.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!goal) {
        res.status(404);
        throw new Error("Goal not found");
    }

    const updatableFields = [
        "title", "description", "targetAmount", "currentAmount", "targetDays", "category", "priority", "status"
    ];
    console.log(req.body.status);
    updatableFields.forEach(field => {
        if (req.body[field] !== undefined) {
            goal[field] = req.body[field];
        }
    });

    const updated = await goal.save();
    res.status(200).json(updated);
});

// Delete goal
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await GoalModel.findOneAndDelete({ _id: req.params.id, user_id: req.user._id });
    if (!goal) {
        res.status(404);
        throw new Error("Goal not found");
    }
    res.status(200).json({ message: "Goal deleted" });
});

// Add to currentAmount
const addToCurrentAmount = asyncHandler(async (req, res) => {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
        res.status(400);
        throw new Error("Amount must be a positive number");
    }

    const goal = await GoalModel.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!goal) throw new Error("Goal not found");

    goal.currentAmount += amount;
    const updated = await goal.save();
    res.status(200).json(updated);
});

// Extend targetDays
const extendGoalDays = asyncHandler(async (req, res) => {
    const { extraDays } = req.body;
    if (!extraDays || extraDays <= 0 || !Number.isInteger(extraDays)) {
        res.status(400);
        throw new Error("extraDays must be a positive integer");
    }

    const goal = await GoalModel.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!goal) throw new Error("Goal not found");

    goal.targetDays += extraDays;
    const updated = await goal.save();
    res.status(200).json(updated);
});

// Mark status manually
const updateGoalStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const validStatuses = ["active", "paused", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
        res.status(400);
        throw new Error("Invalid status value");
    }

    const goal = await GoalModel.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!goal) throw new Error("Goal not found");

    goal.status = status;
    const updated = await goal.save();
    res.status(200).json(updated);
});

// Reset goal
const resetGoal = asyncHandler(async (req, res) => {
    const goal = await GoalModel.findOne({ _id: req.params.id, user_id: req.user._id });
    if (!goal) throw new Error("Goal not found");

    goal.currentAmount = 0;
    goal.status = "active";
    goal.createdAt = new Date();
    const updated = await goal.save();
    res.status(200).json(updated);
});

// Get overdue goals
const getOverdueGoals = asyncHandler(async (req, res) => {
    const all = await GoalModel.find({ user_id: req.user._id });
    const overdue = all.filter(goal => goal.isOverdue);
    res.status(200).json(overdue);
});

// Get upcoming deadline goals (within 7 days)
const getUrgentGoals = asyncHandler(async (req, res) => {
    const all = await GoalModel.find({ user_id: req.user._id });
    const urgent = all.filter(goal => goal.daysRemaining <= 7 && goal.status === "active");
    res.status(200).json(urgent);
});

// Progress summary
const getGoalStats = asyncHandler(async (req, res) => {
    const goals = await GoalModel.find({ user_id: req.user._id });

    const summary = {
        total: goals.length,
        active: goals.filter(g => g.status === "active").length,
        completed: goals.filter(g => g.status === "completed").length,
        overdue: goals.filter(g => g.isOverdue).length,
        shortTerm: goals.filter(g => g.type === "short-term").length,
        longTerm: goals.filter(g => g.type === "long-term").length
    };

    res.status(200).json(summary);
});

module.exports = {
    createGoal,
    getGoals,
    getGoalById,
    updateGoal,
    deleteGoal,
    addToCurrentAmount,
    extendGoalDays,
    updateGoalStatus,
    resetGoal,
    getOverdueGoals,
    getUrgentGoals,
    getGoalStats
};
