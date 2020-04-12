import React from "react";
import Axios from "axios";

class ReviewForm extends React.Component {
  state = {
    url: null,
    article: null,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    const { url, article } = this.state;
    Axios.post("/api/v1/submit", { url: url, article: article })
      .then((res) => {
        alert(
          `you sent this url: ${res.data?.url} \n and this article: ${res.data?.article}
           which has a ${res.data?.sentiment} sentiment`
        );
      })
      .catch((error) => console.error(error));
    event.preventDefault();
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Url:
          <input
            type="text"
            name="url"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Article:
          <textarea
            type="text"
            name="article"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Send" />
      </form>
    );
  }
}

export default ReviewForm;
