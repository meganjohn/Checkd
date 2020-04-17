const express = require('express');
const router = express.Router();
const Sentiment = require('sentiment');
const npmSentiment = new Sentiment();
const translateSentiment = require('../helpers/translateSentiment');
const calculateBias = require('../helpers/calculateBias');
const fs = require('fs');

router.get('/articles', (req, res) => {
  fs.readFile('./articles.json', (err, data) => {
    var obj = JSON.parse(data);
    res.json(obj);
  });
})

router.post('/submit', (req, res) => {
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
  var python = spawn('python3', ['helper.py', JSON.stringify(review)]);
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

/*  if (article) {
    result = npmSentiment.analyze(article);
    sentiment = translateSentiment(result.comparative);
    review.sentiment = sentiment;
    var spawn = require("child_process").spawn;
    var python = spawn('python', ['text_blob.py', article]);
      python.stdout.on('data', function (data) {
        review.sentiment2 = data[0];
        review.objectivity = data[1];
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
    });
    python.stderr.on('data', (data) => {
      console.log(data.toString());
    });
  } else if (url){
    // send back form data as a response
    var urlText = "";
    var spawn = require("child_process").spawn;
    // in production change python3 to python
    var python = spawn('python3', ['helper.py', url]);
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
  */
})

module.exports = router;
