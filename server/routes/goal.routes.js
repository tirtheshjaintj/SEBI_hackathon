const { Router } = require("express");
const {
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
} = require("../controllers/goal.controller");
const { authMiddleware } = require("../middlewares/auth");

const goalRouter = Router();

// 🔐 All routes are protected
goalRouter.use(authMiddleware);

// 📌 CRUD routes
goalRouter.route("/")
    .post(createGoal)     // Create goal
    .get(getGoals);       // Get all goals (with optional filters)

goalRouter.route("/:id")
    .get(getGoalById)     // Get goal by ID
    .put(updateGoal)      // Full update
    .delete(deleteGoal);  // Delete

// 📌 Partial/functional routes
goalRouter.patch("/:id/add-amount", addToCurrentAmount);     // Add money
goalRouter.patch("/:id/extend-days", extendGoalDays);        // Extend duration
goalRouter.patch("/:id/status", updateGoalStatus);           // Manually update status
goalRouter.patch("/:id/reset", resetGoal);                   // Reset goal

// 📌 Reports / smart filters
goalRouter.get("/stats/all", getGoalStats);                  // Summary stats
goalRouter.get("/filter/overdue", getOverdueGoals);          // Overdue goals
goalRouter.get("/filter/urgent", getUrgentGoals);            // Nearing deadline

module.exports = goalRouter;
