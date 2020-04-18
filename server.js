const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const admin = require('firebase-admin');
// so you can use .env
require('dotenv').config();

const app = express();

const {
  PORT = 5000,
  REACT_APP_FIRE_PROJECT_ID,
  type,
  project_id,
  private_key_id,
  private_key,
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url
} = process.env;


admin.initializeApp({
  credential: admin.credential.cert({
  "type": type,
  "project_id": project_id,
  "private_key_id": private_key_id,
  "private_key": private_key,
  "client_email": client_email,
  "client_id": client_id,
  "auth_uri" : auth_uri,
  "token_uri": token_uri,
  "auth_provider_x509_cert_url" : auth_provider_x509_cert_url,
  "client_x509_cert_url" : client_x509_cert_url
  }),
  databaseURL: `https://${REACT_APP_FIRE_PROJECT_ID}.firebaseio.com`
});

let articles = [];

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

module.exports = "hello";
