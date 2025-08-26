const express = require("express");
const { authMiddleware } = require("../middlewares/auth.js"); // replace path if different

const {
  getAllMerchandise,
  redeemMerchandise,
} = require("../controllers/merchandise");
const router = express.Router();

router.get("/", authMiddleware, getAllMerchandise);
router.put("/redeem", authMiddleware, redeemMerchandise);

module.exports = router;
