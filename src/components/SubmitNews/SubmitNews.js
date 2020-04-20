import React from "react";
import ReviewForm from "../ReviewForm/ReviewForm";
import "./SubmitNews.css";
class SubmitNews extends React.Component {
  render() {
    return (
      <div className="SubmitNews">
        <div className="submitnews-card">
        <h1><b>Submit News</b></h1>
        <ReviewForm />
        </div>
      </div>
    );
  }
}

export default SubmitNews;
