import React from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import "./Newsfeed.css";

class Newsfeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: null,
      test: null,
      loading: false,
      openArticleId: null
    };

    this.onArticleClick = this.onArticleClick.bind(this);
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
      <div className="newsfeed">
        <div className="newsfeed-card">
          <div className="newsfeed-title">
            <h1>Newsfeed</h1>
          </div>
          <div className="newsfeed-subtitle">
            <h2>Results of latest news submissions</h2>
          </div>
          <div className="articles">
            {this.state.articles
              ? this.state.articles.map((article) => this.renderArticle(article))
              : null}
          </div>
        </div>
      </div>
    );
  }

  renderArticle(article) {
    var outcomeClass = "article-outcome " + article.outcome.toLowerCase();
    return (
      <>
        <div className="article">
          <div><a href={article.url}>{article.title}</a></div>
          <div className="article-header">Date submitted</div>
          <div className="article-header">Status</div>
          <button className="article-open-button"
                  onClick={() => this.onArticleClick(article.id)}>
            {(this.state.openArticleId !== null &&
              this.state.openArticleId === article.id) ?
              <FontAwesomeIcon icon={faCaretDown} size="lg"/> :
              <FontAwesomeIcon icon={faCaretLeft} size="lg"/>}
          </button>
          <div></div>
          <div>{article.dateSubmitted}</div>
          <div className="article-outcome-column">
            <span className={outcomeClass}>{article.outcome}</span>
          </div>
        </div>
        {(this.state.openArticleId !== null &&
          this.state.openArticleId === article.id) ? (
            <div>
              <div>Sentiment: {article.sentiment}</div>
              <div>Polarity: {article.degree + " " + article.direction}</div>
              <div>Objectivity: {article.objectivity}</div>
              {article.outcome !== "Pending" ?
                <div>Source{article.sources.length > 1 ? "s" :
                  null}: {article.sources}</div> : null}
            </div>
          ) : null}
      </>
    );
  }

  onArticleClick(id) {
    if(this.state.openArticleId !== null) {
      this.setState({
        openArticleId: null
      });
    } else {
      this.setState({
        openArticleId: id
      });
    }
  }
}

export default Newsfeed;
