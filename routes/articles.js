const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  fs.readFile('./articles.json', (err, data) => {
    var obj = JSON.parse(data);
    res.json(obj);
  });
})

router.post('/getPendingById', (req, res) => {
  const {
    articleId
  } = req.body;
  fs.readFile('./articles.json', (err, data) => {
    var obj = JSON.parse(data);
    var foundArticle = obj.articles.filter((article) => {
      return article.id == articleId
    });
    res.json({article: foundArticle});
  });
})

router.get('/pending', (req, res) => {
  fs.readFile('./articles.json', (err, data) => {
    var obj = JSON.parse(data);
    var pendingArticles = obj.articles.filter((article) => {
      return article.outcome === 'Pending'
    });
    res.json({articles: pendingArticles});
  });
})

router.post('/updateArticle', (req, res) => {
  const {
    articleId,
    outcome,
    source
  } = req.body;
  var articles;
  fs.readFile('./articles.json', (err, data) => {
    var obj = JSON.parse(data);
    var foundArticles = obj.articles.filter((article) => {
      return article.id == articleId
    });
    var foundArticle = foundArticles[0];
    var indexOfArticle = obj.articles.indexOf(foundArticle);
    foundArticle.outcome = outcome;
    foundArticle.source = source;
    obj.articles[indexOfArticle] = foundArticle;
    fs.writeFile('./articles.json', JSON.stringify(obj),
      (err) => {
        if(err) throw err;
        res.sendStatus(200);
      }
    );
  });
})

module.exports = router;
