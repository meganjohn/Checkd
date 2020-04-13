const express = require('express');
const router = express.Router();
const Sentiment = require('sentiment');
const npmSentiment = new Sentiment();
const translateSentiment = require('../helpers/translateSentiment');
const axios = require('axios');
const qs = require('query-string');
const translateBias = require('../helpers/translateBias');

router.post('/submit', (req, res) => {
  // data from Review Form
  const {
    url,
    article
  } = req.body;
  var result, sentiment;
  const body = {
    API: process.env.API_KEY_BI,
    Text: article
  };
  const config = {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  };

  if (article) {
    result = npmSentiment.analyze(article);
    sentiment = translateSentiment(result.comparative);
    axios
    .post("https://api.thebipartisanpress.com/api/endpoints/beta/robert", qs.stringify(body), config)
      .then((response) => {
        const {direction, degree} = translateBias(response.data);
        res.json({bias: `The article has a ${degree} ${direction} political bias`,
                sentiment: sentiment})
      }).catch((error) => {
        console.log(error)
        res.sendStatus(500).send(error)
      });
  } else if (url){
    // send back form data as a response
    var urlText = "";
    var spawn = require("child_process").spawn;
    var python = spawn('python3', ['helper.py', url]);
    python.stdout.on('data', function (data) {
      urlText = data.toString();
      result = npmSentiment.analyze(urlText);
      sentiment = translateSentiment(result.comparative);

      axios
      .post("https://api.thebipartisanpress.com/api/endpoints/beta/robert", qs.stringify(body), config)
        .then((response) => {
          const {direction, degree} = translateBias(response.data);
          res.json({bias: `The article has a ${degree} ${direction} political bias`,
                  sentiment: sentiment})
        }).catch((error) => {
          console.log(error)
          res.sendStatus(500).send(error)
        })
    });
    python.stderr.on('data', (data) => {
      console.log(data.toString());
    });
  } else {
    res.sendStatus(200).json({
      url,
      article
    })
  }
})

module.exports = router;
