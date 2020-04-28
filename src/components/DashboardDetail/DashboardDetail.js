import React from "react";
import Axios from "axios";
import { Button, Form, TextInput } from "carbon-components-react";
import "./DashboardDetail.css";

class DashboardDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: this.props.match.params.id,
      article: null,
      source: null
    };

    this.onSourceChange = this.onSourceChange.bind(this);
    this.titleCase = this.titleCase.bind(this);
    this.verifyNews = this.verifyNews.bind(this);
  }

  componentDidMount() {
    if(this.props.auth.loggedIn) {
      Axios.post("/api/v1/articles/getPendingById",
        { articleId: this.state.articleId })
        .then((res) => {
          this.setState({
            article: res.data?.article[0]
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  verifyNews(ev, fake) {
    Axios.post("api/v1/articles/updateArticle",
      { articleId: this.state.articleId,
        outcome: fake ? "Fake" : "Verified",
        source: this.state.source})
      .then((res) => {
        this.props.history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
    ev.preventDefault();
  }

  onSourceChange(ev) {
    alert(ev.target.value);
    this.setState({
      source: ev.target.value
    });
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
          <button onClick={() => this.props.history.push("/login")}>
            Please login
          </button>
        </div>
      );
    } else {
      return (
        <div className="dashboard-details">
          <div className="dashboard-details-card">
            <h1>Moderate submission</h1>
            <h2>{loading ? 'Loading...' : ''}</h2>
            <h3>
              {this.state.article ? this.state.article.title +
              (!this.state.article.url ? "..." : ""): ""}
            </h3>
            <div>{this.state.article ? (this.state.article.url ?
              <a href={this.state.article.url}>{this.state.article.url}</a>
                : this.state.article.article) : ''}</div>
            <div className="submission-details">
              <div className="submission-details-left">Sentiment:</div>
              <div>{this.state.article ?
                this.titleCase(this.state.article.sentiment) : null}</div>
              <div className="submission-details-left">Polarity:</div>
              <div>{this.state.article ?
                (this.titleCase(this.state.article.degree) + " " +
                  this.titleCase(this.state.article.direction)) :
                null}</div>
              <div className="submission-details-left">Objectivity:</div>
              <div>{this.state.article ?
                this.titleCase(this.state.article.objectivity) : null}
              </div>
            </div>
            <div className="submission-details-left">Source:</div>
            <TextInput className="submission-source"
                       onChange={this.onSourceChange}/>
            <div className="dashboard-details-buttons">
              <Form onSubmit={(ev) => this.verifyNews(ev, true)}>
                <Button kind="danger" tabIndex={1} type="submit">
                  Declare fake
                </Button>
              </Form>
              <Form onSubmit={(ev) => this.verifyNews(ev, false)}>
                <Button kind="primary" tabIndex={0} type="submit">
                  Verify news
                </Button>
              </Form>
            </div>
          </div>
        </div>
      );
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

export default DashboardDetail;
