import React from "react";
import Axios from "axios";
import "./Newsfeed.css";

class Newsfeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      test: null,
      loading: false,
    };

    this.renderArticle = this.renderArticle.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });

    Axios.get("api/v1/articles", {})
      .then((res) => {
        this.setState({
          articles: res.data?.articles,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <>
        <div>Newsfeed</div>
        <div className="articles">
          {this.state.articles
            ? this.state.articles.map((article) => this.renderArticle(article))
            : null}
        </div>
      </>
    );
  }

  renderArticle(article) {
    return (
      <div className="article">
        <div>
          <a href={article.url}>{article.title}</a>
        </div>
        <div>Sentiment: {article.sentiment}</div>
        <div>Polarity: {article.degree + " " + article.direction}</div>
        <div>Verified: {article.verified ? "Yes" : "No"}</div>
      </div>
    );
  }
}

export default Newsfeed;
