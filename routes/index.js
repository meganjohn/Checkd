const express = require('express');
const router = express.Router();
const submit = require('./submit');
const auth = require('./auth');
const articles = require('./articles');


router.use('/submit', submit);
router.use('/auth', auth);
router.use('/articles', articles);

module.exports = router;

