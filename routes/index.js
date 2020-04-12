const express = require('express');
const Sentiment = require('sentiment');
const router = express.Router();
const sentiment = new Sentiment();

router.post('/submit', (req, res) => {
  // data from Review Form
  const {url, article} = req.body;
  // send back form data as a response
  var result;
  if (article) {
    result = sentiment.analyze(article);
    console.log(result);
  }
  res.status(200).json({url, article, result})
})

module.exports = router;
