const { checkForSpam, chat, getChats, getGoalTip, getWordDefinition } = require("../controllers/ai.controllers");
const { authMiddleware } = require("../middlewares/auth");
const upload = require("../middlewares/multer");
const { Router } = require("express");

const aiRouter = Router();

aiRouter.post("/detect", upload.single("file"), authMiddleware, checkForSpam);
aiRouter.post("/chat", upload.single("file"), authMiddleware, chat);
aiRouter.get("/chats", authMiddleware, getChats);
aiRouter.post("/tip/:goal_id", authMiddleware, getGoalTip);
aiRouter.post("/dictionary", getWordDefinition);

module.exports = aiRouter;