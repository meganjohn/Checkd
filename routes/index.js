const express = require('express');
const submit = require('./submit');
const auth = require('./auth');

const router = express.Router();

router.use('/submit', submit);
router.use('/auth', auth);

module.exports = router;