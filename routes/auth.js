const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

/**
 * Uses firebase to check if user has is signed in
 * if so they are authorised 
 * then it sends the authorisation status back as a response 
 */
router.get('/', (req, res) => {
  if (req.headers.authtoken) {
    admin.auth().verifyIdToken(req.headers.authtoken)
      .then(() => {
        res.status(200).send('Authorised')
      }).catch(() => {
        res.status(403).send('Unauthorised')
      });
  } else {
    res.status(403).send('Unauthorised')
  }
});


module.exports = router;
