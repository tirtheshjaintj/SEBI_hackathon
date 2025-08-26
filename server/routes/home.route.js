const { Router } = require("express");
const { getHomeScreenData } = require("../controllers/home.controller.js");
const { authMiddleware } = require("../middlewares/auth");
const router = Router();

router.get("/", authMiddleware, getHomeScreenData);

module.exports = router;