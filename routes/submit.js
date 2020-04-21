const express = require('express');
const router = express.Router();
const Sentiment = require('sentiment');
const npmSentiment = new Sentiment();
const translateSentiment = require('../helpers/translateSentiment');
const calculateBias = require('../helpers/calculateBias');
const fs = require('fs');

router.post('/', (req, res) => {
  // data from Review Form
  let review = {
    url: req.body.url,
    article: req.body.article
  };

  var result, sentimentFromNpm;

  var spawn = require("child_process").spawn;
  var python = spawn('python', ['helper.py', JSON.stringify(review)]);
  python.stdout.on('data', async function (data) {
    try {
      // articleData is an object
      // articleData = { article: 'None', sentiment: [ 'neutral', 'very objective' ] }
      const articleData = JSON.parse(data);

      //npm sentiment section
      result = npmSentiment.analyze(articleData.article);
      sentimentFromNpm = translateSentiment(result.comparative);
      review.sentiment = sentimentFromNpm;

      // Text blob section
      review.polarity = articleData.sentiment[0];
      review.objectivity = articleData.sentiment[1];

      const {
        direction,
        degree,
        error
      } = await calculateBias(articleData.article);
      if (error) review.biasError = "could not calculate political bias";
      review.degree = degree;
      review.direction = direction;
      //<- save review to articles.json

      // send resource created success response
      res.sendStatus(201);
    } catch (error) {
      console.log(error)
      res.send(500).json({
        error: "something went wrong"
      })
    }
  });

  python.stderr.on('data', (data) => {
    console.log(data.toString());
  });

  python.on('close', (code) => {
    console.log(`Python child process exited with status code ${code}`)
    if(code !== 0){
      res.sendStatus(500);
    }
  });

})

module.exports = router;