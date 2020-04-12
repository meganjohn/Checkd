const express = require('express');
const router = express.Router();
const Sentiment = require('sentiment');
const npmSentiment = new Sentiment();
const translateSentiment = require('../helpers/translateSentiment');

router.post('/submit', (req, res) => {
  // data from Review Form
  const {url, article} = req.body;
  // send back form data as a response
  var result;
  if (article) {
    result = npmSentiment.analyze(article);
  }
  var sentiment = translateSentiment(result.score);
  res.status(200).json({url, article, sentiment})
})

module.exports = router;
