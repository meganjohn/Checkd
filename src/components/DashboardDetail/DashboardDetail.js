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
    console.log("verify news " + fake);
    Axios.post("api/v1/articles/updateArticle",
      { articleId: this.state.articleId,
        outcome: fake ? "Fake" : "Verified",
        source: this.state.source})
      .then((res) => {
        this.props.history.push("/dashboard");
        //this.props.redirect('/dashboard')
      })
      .catch((error) => {
        console.log(error);
      });
    ev.preventDefault();
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
            <h2>{this.state.article ? this.state.article.url : 'Article not found'}</h2>
            <div>Sentiment: {this.state.article ?
              this.state.article.sentiment : null}</div>
            <div>Polarity: {this.state.article ?
              (this.state.article.degree + " " + this.state.article.direction) :
              null}</div>
            <div>Objectivity: {this.state.article ?
              this.state.article.objectivity : null}
            </div>
            <div>Source:</div>
            <TextInput/>
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
}

export default DashboardDetail;
