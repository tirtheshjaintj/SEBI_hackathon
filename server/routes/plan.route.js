const express = require("express");
const { createNewPlan } = require("../controllers/plan.controller.js");
const router = express.Router();

router.post("/", createNewPlan);

module.exports = router;
