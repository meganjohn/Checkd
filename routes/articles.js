const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  fs.readFile('./articles.json', (err, data) => {
    var obj = JSON.parse(data);
    res.json(obj);
  });
})


module.exports = router;