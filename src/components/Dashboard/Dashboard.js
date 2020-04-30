import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "carbon-components-react";
import compareDesc from "date-fns/compareDesc";
import parse from "date-fns/parse";
import "./Dashboard.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingArticles: null
    };

    this.renderArticle = this.renderArticle.bind(this);
    this.verifyArticle = this.verifyArticle.bind(this);
  }

  componentDidMount() {
    if(this.props.auth.loggedIn) {
      Axios.get("api/v1/articles/pending", {})
        .then((res) => {
          this.setState({
            pendingArticles: res.data?.articles
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  verifyArticle(article) {
    alert(article.url);
  }

  render() {
    const { loading, loggedIn } = this.props.auth;
    let pendingArticles = this.state.pendingArticles;
    if (pendingArticles) {
      pendingArticles = pendingArticles.sort((a, b) => {
        var dateLeft = parse(a.dateSubmitted, "dd/MM/yyyy", new Date());
        var dateRight = parse(b.dateSubmitted, "dd/MM/yyyy", new Date());
        return compareDesc(dateLeft, dateRight);
      });
    }
    if (loading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else if (!loading && !loggedIn) {
      return (
        <div>
          <p>Unauthorised</p>
          <button onClick={()=>this.props.history.push("/login")}>Please login</button>
        </div>
      );
    } else {
      return (
        <div className="dashboard">
          <div className="dashboard-card">
            <h1>Moderator Dashboard</h1>
            {pendingArticles && pendingArticles.length > 0 ?
              <div className="articles">
                {pendingArticles.map((article) =>
                  this.renderArticle(article))}
              </div>
            : <div>No articles awaiting moderation</div>}
            </div>
        </div>
      );
    }
  }

  renderArticle(article) {
    return (
      <div className="pending-article">
        <div className="pending-article-details">
          <div>
            {article.url ?
              <a href={article.url}>{article.title}</a> :
              <div>{article.article}</div>
            }
          </div>
          <div className="article-date-section">
            <div className="article-header">Date submitted</div>
            <div>{article.dateSubmitted}</div>
          </div>
        </div>
        <Link to={"/dashboard/" + article.id}>
          <Button kind="primary" tabIndex={0} type="submit">
            Review
          </Button>
        </Link>
      </div>
    );
  }
}

export default Dashboard;
