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
  var sentiment;
  if (article) {
    result = npmSentiment.analyze(article);
    sentiment = translateSentiment(result.comparative);
    res.status(200).json({url, article, sentiment})
  } else if(url) {
    var urlText = "";
    var spawn = require("child_process").spawn;
    var process = spawn('python3', ['helper.py', url]);
    process.stdout.on('data', function (data) {
      urlText = data.toString();
      result = npmSentiment.analyze(urlText);
      var sentiment = translateSentiment(result.comparative);
      res.status(200).json({url, article, sentiment})
    });
    process.stderr.on('data', (data) => {
      console.log(data.toString());
    });
  }
})

module.exports = router;
