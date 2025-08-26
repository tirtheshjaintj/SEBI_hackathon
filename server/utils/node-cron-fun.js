const axios = require('axios');
const News = require('../models/News.js');

async function fetchAndSaveNews() {
  try {
    console.log('🌐 Fetching news...');
    const topic = "finance";
    const lang = "en";
    const country = "in";
    const max = 10;
    const apikey = "746024542d30e168fcf58b867174e0ce";

    const res = await axios.get(
    `https://gnews.io/api/v4/search?q=${topic}&lang=${lang}&country=${country}&max=${max}&apikey=${apikey}`
    );

    
  } catch (err) {
    console.error('❌ Failed to fetch news:', err.message);
  }
}


module.exports = {fetchAndSaveNews};