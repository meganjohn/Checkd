const express = require('express');
const router = express.Router();

router.post('/submit', (req, res) => {
  // data from Review Form
  const {url, article} = req.body;
  // send back form data as a response
  res.status(200).json({url, article})
})

module.exports = router;