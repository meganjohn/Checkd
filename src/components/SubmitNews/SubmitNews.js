import React from "react";
import ReviewForm from "../ReviewForm/ReviewForm";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import { InlineNotification } from "carbon-components-react";
import "./SubmitNews.css";
class SubmitNews extends React.Component {
  state = {
    loading: false,
    error: false,
  };

  setStatus = (state) => {
    this.setState(state);
  };

  redirect = (path) => {
    this.props.history.push(path);
  };

  render() {
    return (
      <div className="SubmitNews">
        <LoadingOverlay loading={this.state.loading} />
        {this.state.error && (
          <InlineNotification
            kind="error"
            iconDescription="close submit error notification"
            subtitle="Could not submit news"
            title="Something went wrong"
          />
        )}
        <div className="submitnews-card">
          <h1>
            <b>Submit News</b>
          </h1>
          <ReviewForm redirect={this.redirect} setStatus={this.setStatus} />
        </div>
      </div>
    );
  }
}

export default SubmitNews;
