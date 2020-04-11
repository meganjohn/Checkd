const express = require('express');
const router = express.Router();
const axios = require('axios');
const qs = require('query-string');

router.post('/submit', (req, res) => {
  // data from Review Form
  const {
    url,
    article
  } = req.body;

  if (article) {
    const body = {
      API: process.env.API_KEY_BI,
      Text: article
    };
    const config = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    };
    axios
    .post("https://api.thebipartisanpress.com/api/endpoints/beta/robert", qs.stringify(body), config)
      .then((response) => {
        let bias = response.data;
        let direction;
        let degree;
        direction = (Math.sign(bias)? "right" : "left");
        if (Math.abs(bias) > 31.5){
          degree = "extreme";
        } else if (Math.abs(bias) > 21) {
          degree = "strong";
        } else if (Math.abs(bias) > 10.5) {
          degree = "moderate";
        } else {
          degree = "minimal";
        }
        res.sendStatus(200).json({bias: `The article has a ${degree} ${direction} bias`})
      }).catch((error) => {
        console.log(error)
        res.sendStatus(500).send(error)
      })
  } else {
    // send back form data as a response
    res.sendStatus(200).json({
      url,
      article
    })
  }
})

module.exports = router;