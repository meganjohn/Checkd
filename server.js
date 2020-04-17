const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const admin = require('firebase-admin');
// so you can use .env
require('dotenv').config();

const serviceAccount = require("./config/serviceAccountKey.json");

const app = express();

const {
  PORT = 5000,
  REACT_APP_FIRE_PROJECT_ID
} = process.env;


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${REACT_APP_FIRE_PROJECT_ID}.firebaseio.com`
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '/build')));


app.use('/api/v1', routes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Checkd is running on port: ${PORT}`);
});
