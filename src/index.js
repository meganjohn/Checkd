import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

const {
  REACT_APP_FIRE_API_KEY,
  REACT_APP_FIRE_PROJECT_ID,
  REACT_APP_FIRE_MSG_SENDER_ID,
  REACT_APP_FIRE_APP_ID
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIRE_API_KEY,
  authDomain: `${REACT_APP_FIRE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${REACT_APP_FIRE_PROJECT_ID}.firebaseio.com`,
  projectId: REACT_APP_FIRE_PROJECT_ID,
  storageBucket: `${REACT_APP_FIRE_PROJECT_ID}.appspot.com`,
  messagingSenderId: REACT_APP_FIRE_MSG_SENDER_ID,
  appId: REACT_APP_FIRE_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render( <
  React.StrictMode >
  <
  App / >
  <
  /React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();