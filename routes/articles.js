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

module.exports = router;
