const express = require("express");
const { savePushToken } = require("../controllers/notifications");
const { authMiddleware } = require("../middlewares/auth");
const router = express.Router();

router.post("/save", authMiddleware, savePushToken);

module.exports = router;