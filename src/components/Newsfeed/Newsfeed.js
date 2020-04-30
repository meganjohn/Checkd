import React from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import compareDesc from "date-fns/compareDesc";
import parse from "date-fns/parse";
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
    this.titleCase = this.titleCase.bind(this);
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
    let articles = this.state.articles;
    if (articles) {
      articles = articles.sort((a, b) => {
        var dateLeft = parse(a.dateSubmitted, "dd/MM/yyyy", new Date());
        var dateRight = parse(b.dateSubmitted, "dd/MM/yyyy", new Date());
        return compareDesc(dateLeft, dateRight);
      });
    }
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
            {articles
              ? articles.map((article) => this.renderArticle(article))
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
          <div>{article.url ? <a href={article.url}>{article.title}</a> :
            <>{article.title + '...'}</>}
          </div>
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
            <div className="article-details">
              {!article.url ?
                <>
                  <div className="article-details-left">Content:</div>
                  <div>{article.article}</div>
                </> : null
              }
              <div className="article-details-left">Sentiment:</div>
              <div>{this.titleCase(article.sentiment)}</div>
              <div className="article-details-left">Polarity:</div>
              <div>
                {this.titleCase(article.degree) + " " + this.titleCase(article.direction)}</div>
              <div className="article-details-left">Objectivity:</div>
              <div>{this.titleCase(article.objectivity)}</div>
              {article.source ?
                <>
                  <div className="article-details-left">Source:</div>
                  <div><a href={article.source}>{article.source}</a></div>
                </> : null}
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

  titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }
}

export default Newsfeed;
