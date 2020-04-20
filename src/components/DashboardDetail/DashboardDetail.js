import React from "react";
import Axios from "axios";
import { Button, TextInput } from "carbon-components-react";

class DashboardDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleId: this.props.match.params.id,
      article: null
    };
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
        <div>
          <h1>Moderate submission - article id={this.props.match.params.id}</h1>
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
          <Button kind="danger" tabIndex={1} type="submit">
            Declare fake
          </Button>
          <Button kind="primary" tabIndex={0} type="submit">
            Verify news
          </Button>
        </div>
      );
    }
  }
}

export default DashboardDetail;
