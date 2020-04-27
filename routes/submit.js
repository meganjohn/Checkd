const express = require('express');
const router = express.Router();
const Sentiment = require('sentiment');
const npmSentiment = new Sentiment();
const translateSentiment = require('../helpers/translateSentiment');
const calculateBias = require('../helpers/calculateBias');
const fs = require('fs');
const format = require('date-fns/format');

router.post('/', (req, res) => {
  // data from Review Form
  const {
    url,
    article
  } = req.body;
  const filePath = './articles.json';

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
          console.log("parsing article data")
          const articleData = JSON.parse(articleBuffer[0].toString('utf-8'));

          //npm sentiment section
          console.log("calculating article sentiment")
          const result = npmSentiment.analyze(articleData.article);
          const sentimentFromNpm = translateSentiment(result.comparative);
          const sentiment = sentimentFromNpm;

          // Text blob section
          console.log("retrieving polarity and objectivity")
          const polarity = articleData.sentiment[0];
          const objectivity = articleData.sentiment[1];

          console.log("calculating political bias")
          const {
            direction,
            degree,
            error
          } = await calculateBias(articleData.article);
          const biasError = error ? "could not calculate political bias" : null;


          const date = new Date();

          // save initial review to articles.json
          console.log("opening articles datastore")
          const allArticlesData = fs.readFileSync(filePath);
          const allArticlesJSON = JSON.parse(allArticlesData);
          const id = allArticlesJSON.articles.length;
          const newArticle = {
            "id": id,
            "title": articleData.title,
            "url": url,
            "article": articleData.article,
            "sentiment": sentiment,
            "degree": degree || biasError,
            "direction": direction || biasError,
            "objectivity": objectivity,
            "outcome": "Pending",
            "dateSubmitted": format(date, "dd/MM/yyyy"),
            "sources": ""
          }
          console.log("saving new article to datastore")
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
