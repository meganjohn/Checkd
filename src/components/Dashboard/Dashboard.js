import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingArticles: null
    };

    this.renderArticle = this.renderArticle.bind(this);
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

  render() {
    const { loading, loggedIn } = this.props.auth;
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
        <div>
          <h1>Dashboard</h1>
          <ul>
            <li>
              <Link to="/dashboard/1">Moderate submission: articleID=1</Link>
            </li>
            <li>
              <Link to="/dashboard/2">Moderate submission: articleID=2</Link>
            </li>
            <li>
              <Link to="/dashboard/3">Moderate submission: articleID=3</Link>
            </li>
          </ul>
          {this.state.pendingArticles ?
            <div className="articles">
              {this.state.pendingArticles
                ? this.state.pendingArticles.map((article) =>
                  this.renderArticle(article))
                : null}
            </div>
          : <div>No articles awaiting moderation</div>}
        </div>
      );
    }
  }

  renderArticle(article) {
    return (
      <>
        <div className="article">
          <div><a href={article.url}>{article.title}</a></div>
          <div className="article-header">Date submitted</div>
          <div></div>
          <div>{article.dateSubmitted}</div>
        </div>
      </>
    );
  }
}

export default Dashboard;
