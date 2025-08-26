const { Router } = require("express");
const { authMiddleware } = require('../middlewares/auth.js'); // replace path if different
const { addReportApp, viewReportApp, addReportCall, viewReportCall, checkSpam, getReports } = require("../controllers/report.controller");

const reportRoutes = Router();

reportRoutes.post("/add", authMiddleware, addReportApp);
reportRoutes.get("/view", authMiddleware, viewReportApp);
reportRoutes.post("/add/call", authMiddleware, addReportCall);
reportRoutes.get("/view/call", authMiddleware, viewReportCall);
reportRoutes.get("/check", checkSpam);
reportRoutes.get("/reports", authMiddleware, getReports);

module.exports = reportRoutes;