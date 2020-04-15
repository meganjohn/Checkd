const express = require('express');
const router = express.Router();
const Sentiment = require('sentiment');
const npmSentiment = new Sentiment();
const translateSentiment = require('../helpers/translateSentiment');
const calculateBias = require('../helpers/calculateBias');

router.post('/submit', (req, res) => {
  // data from Review Form
  const {
    url,
    article
  } = req.body;
  console.log(req.body)
  var result, sentiment;
  let review = {
    url,
    article
  };

  if (article) {
    result = npmSentiment.analyze(article);
    sentiment = translateSentiment(result.comparative);
    review.sentiment = sentiment;
    (async () =>{
      try {
        const {direction, degree, error} = await calculateBias(article);
        if (error) review.biasError = "could not calculate political bias";
        review.degree = degree;
        review.direction = direction;
        res.json(review)
      } catch(error) {
        console.log(error)
        res.send(500).json({error: 'something went wrong'})
      }
    })()
      
  } else if (url){
    // send back form data as a response
    var urlText = "";
    var spawn = require("child_process").spawn;
    // in production change python3 to python
    var python = spawn('python', ['helper.py', url]);
    python.stdout.on('data', function (data) {
      urlText = data.toString();
      result = npmSentiment.analyze(urlText);
      sentiment = translateSentiment(result.comparative);
      review.sentiment = sentiment;
      review.article = urlText;
      (async () =>{
        try {
          const {direction, degree, error} = await calculateBias(urlText);
          if (error) review.biasError = "could not calculate political bias";
          review.degree = degree;
          review.direction = direction;
          res.json(review)
        } catch(error) {
          console.log(error)
          review.error = 'something went wrong';
          res.send(500).json(review)
        }
      })()
    });
    python.stderr.on('data', (data) => {
      console.log(data.toString());
    });
  } else {
    res.send(200).json(review)
  }
})

module.exports = router;
