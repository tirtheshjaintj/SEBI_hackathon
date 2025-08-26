const express = require("express");
const router = express.Router();
const {
  checkoutSubscription,
  verifyOrder,
} = require("../controllers/subscription.controller.js");
const { authMiddleware } = require("../middlewares/auth");

router.post("/order", authMiddleware, checkoutSubscription);
router.post("/verify", authMiddleware, verifyOrder);

module.exports = router;
