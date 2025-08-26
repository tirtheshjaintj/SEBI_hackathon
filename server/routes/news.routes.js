const express = require('express');
const {getLatestNews , getAllNews} = require('../controllers/news.js');
const router = express.Router();

// GET /api/news → latest news
router.get('/', getLatestNews);

// (optional) GET /api/news/all → all news
router.get('/all', getAllNews);

module.exports = router;