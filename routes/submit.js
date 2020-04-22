const express = require('express');
const router = express.Router();
const Sentiment = require('sentiment');
const npmSentiment = new Sentiment();
const translateSentiment = require('../helpers/translateSentiment');
const calculateBias = require('../helpers/calculateBias');
const fs = require('fs');

router.post('/', (req, res) => {
  // data from Review Form
  const {
    url,
    article
  } = req.body;
  const filePath = './articles.json';
  let result, sentimentFromNpm, sentiment, polarity, objectivity, degree, direction, biasError, dateSubmitted, title;

  const spawn = require("child_process").spawn;
  const python = spawn('python', ['helper.py', JSON.stringify({
    url: url,
    article: article
  })]);

  let articleBuffer = [];

  python.stdout.on('data', (data) => {
    articleBuffer.push(data);
  });

  python.stderr.on('data', (data) => {
    console.log(data.toString());
  });

  python.on('close', (code) => {
    console.log(`Python child process exited with status code ${code}`)
    if (code !== 0) {
      res.sendStatus(500);
    } else {
      (async () => {
        try {
          const articleData = JSON.parse(articleBuffer[0].toString('utf-8'));
          title = articleData.title;

          //npm sentiment section
          result = npmSentiment.analyze(articleData.article);
          sentimentFromNpm = translateSentiment(result.comparative);
          sentiment = sentimentFromNpm;

          // Text blob section
          polarity = articleData.sentiment[0];
          objectivity = articleData.sentiment[1];

          const {
            direction,
            degree,
            error
          } = await calculateBias(articleData.article);
          if (error) biasError = "could not calculate political bias";


          const date = new Date();
          dateSubmitted = date.toLocaleDateString('en-GB');

          // save initial review to articles.json
          const allArticlesData = fs.readFileSync(filePath);
          const allArticlesJSON = JSON.parse(allArticlesData);
          const id = allArticlesJSON.articles.length;
          const newArticle = {
            "id": id,
            "title": title,
            "url": url,
            "article": article,
            "sentiment": sentiment,
            "degree": degree || biasError,
            "direction": direction || biasError,
            "objectivity": objectivity,
            "outcome": "Pending",
            "dateSubmitted": dateSubmitted,
            "sources": []
          }
          allArticlesJSON.articles.push(newArticle)
          fs.writeFile(filePath, JSON.stringify(allArticlesJSON, null, 4), (err) => {
            if (err) {
              throw err
            } else {
              console.log("User submission saved")
            }
          })

          // send resource created success response
          res.sendStatus(201);
        } catch (error) {
          console.log('myerror: ', error)
          res.sendStatus(500);
        }
      })()
    }
  });
})

module.exports = router;