const News = require('../models/News.js');


exports.getLatestNews = async (req, res) => {
  try {
    
    const language = req.headers.language;
    console.log({language})
    // Try to get today's news
    let news = await News.findOne({ language: language })
    console.log({news})

    
    res.json({
      message: 'News fetched successfully',
      news: news
    });
  } catch (err) {
    console.error('❌ Error fetching news:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


exports.getAllNews = async (req, res) => {
  try {
    const allNews = await News.find().sort({ date: -1 });
    res.json({
      message: 'All news fetched successfully',
      news: allNews
    });
  } catch (err) {
    console.error('❌ Error fetching all news:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
