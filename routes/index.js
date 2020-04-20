const express = require('express');
const router = express.Router();
const submit = require('./submit');
const articles = require('./articles');


router.use('/submit', submit);
router.use('/articles', articles);

module.exports = router;
