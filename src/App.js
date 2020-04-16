import React from 'react';
import ReviewForm from './components/ReviewForm/ReviewForm';
import Auth from './components/Auth/Auth';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <ReviewForm />
      <Auth />
    </React.Fragment>
  );
}

export default App;
