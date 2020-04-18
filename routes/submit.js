const express = require('express');
const router = express.Router();
const Sentiment = require('sentiment');
const npmSentiment = new Sentiment();
const translateSentiment = require('../helpers/translateSentiment');
const calculateBias = require('../helpers/calculateBias');


router.post('/', (req, res) => {
  // data from Review Form
  const {
    url,
    article
  } = req.body;

  // console.log(req.body);
  var result, sentimentFromNpm;
  let review = {
    url,
    article
  };

  var spawn = require("child_process").spawn;
  var python = spawn('python', ['helper.py', JSON.stringify(review)]);
    python.stdout.on('data', function (data) {
      // articleText is an object
      // articleText = { article: 'None', sentiment: [ 'neutral', 'very objective' ] }
      const articleData = JSON.parse(data);

      //npm sentiment section
      result = npmSentiment.analyze(articleData.article);
      sentimentFromNpm = translateSentiment(result.comparative);
      review.sentiment = sentimentFromNpm;

      // Text blob section
      review.polarity = articleData.sentiment[0];
      review.objectivity = articleData.sentiment[1];
      (async () => {
        try {
          const {direction, degree, error} = await calculateBias(articleData.article);
          if (error) review.biasError = "could not calculate political bias";
          review.degree = degree;
          review.direction = direction;
          res.json(review)
        } catch (error) {
          console.log(error)
          res.send(500).json({error: "something went wrong"})
        }
      }) ()
    });
    python.stderr.on('data', (data) => {
      console.log(data.toString());
    })
})

module.exports = router;
