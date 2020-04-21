import React from "react";
import ReviewForm from "../ReviewForm/ReviewForm";
import { Loading } from "carbon-components-react";
import "./SubmitNews.css";
class SubmitNews extends React.Component {
  state = {
    loading: false,
  };

  setLoading = (value) => {
    this.setState({ loading: value });
  };

  redirect = (path) => {
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="SubmitNews">
        {this.state.loading && (
          <div className="submitnews-loading">
            <Loading
              description="Active loading indicator"
              withOverlay={false}
            />
          </div>
        )}
        <div className="submitnews-card">
          <h1>
            <b>Submit News</b>
          </h1>
          <ReviewForm redirect={this.redirect} setLoading={this.setLoading} />
        </div>
      </div>
    );
  }
}

export default SubmitNews;
