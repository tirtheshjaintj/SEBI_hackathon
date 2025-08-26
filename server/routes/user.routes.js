const express = require('express');
const router = express.Router();
const {GoogleSignIn, authCheck, sendLoginAlert} = require('../controllers/user.js');
const { updateStreak } = require('../controllers/streak.controller.js');
const {authMiddleware} = require('../middlewares/auth.js'); // replace path if different

router.post('/google', GoogleSignIn);
router.put('/streak', authMiddleware, updateStreak);
router.post("/authcheck", authCheck);
router.post('/notify',sendLoginAlert)


module.exports = router;
