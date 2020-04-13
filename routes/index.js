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
  var result, sentiment;
  let data = {
    url,
    article
  };

  if (article) {
    result = npmSentiment.analyze(article);
    sentiment = translateSentiment(result.comparative);
    data.sentiment = sentiment;
    (async () =>{
      try {
        const {direction, degree, error} = await calculateBias(article);
        if (error) data.biasError = "could not calculate political bias";
        data.degree = degree;
        data.direction = direction;
        res.json(data)
      } catch(error) {
        console.log(error)
        res.send(500).json({error: 'something went wrong'})
      }
    })()
      
  } else if (url){
    // send back form data as a response
    var urlText = "";
    var spawn = require("child_process").spawn;
    var python = spawn('python3', ['helper.py', url]);
    python.stdout.on('data', function (data) {
      urlText = data.toString();
      result = npmSentiment.analyze(urlText);
      sentiment = translateSentiment(result.comparative);
      data.sentiment = sentiment;
      (async () =>{
        try {
          const {direction, degree, error} = await calculateBias(article);
          if (error) data.biasError = "could not calculate political bias";
          data.degree = degree;
          data.direction = direction;
          res.json(data)
        } catch(error) {
          console.log(error)
          data.error = 'something went wrong';
          res.send(500).json(data)
        }
      })()
    });
    python.stderr.on('data', (data) => {
      console.log(data.toString());
    });
  } else {
    res.send(200).json(data)
  }
})

module.exports = router;
