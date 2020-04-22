import React from "react";
import Axios from "axios";
import {
  Form,
  FormGroup,
  TextInput,
  TextArea,
  Button,
  RadioButton,
  RadioButtonGroup,
} from "carbon-components-react";
//import { CSSTransition,  TransitionGroup } from "react-transition-group";
import "./ReviewForm.css";

class ReviewForm extends React.Component {
  state = {
    url: null,
    article: null,
    format: "url",
    charsLeft: 5000,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleTextareaChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value, charsLeft: 5000 - value.length });
  };

  handleOptionChange = (value, name, event) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    this.props.setLoading(true);
    const { url, article } = this.state;
    Axios.post("/api/v1/submit", { url: url, article: article })
      .then((res) => {
        console.log(res)
        return this.props.setLoading(false)})
        .then(() => this.props.redirect('/newsfeed'))
      .catch((error) => {
        console.error(error);
        this.props.setLoading(false);
      });
    event.preventDefault();
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup legendText="Format of your news source">
          <RadioButtonGroup
            defaultSelected="url"
            legend="Group Legend"
            name="format"
            valueSelected={this.state.format}
            onChange={this.handleOptionChange}
          >
            <RadioButton
              className={
                (this.state.format === "text" ? "disabled-colour" : "") +
                " review-form-margin"
              }
              id="radio-link"
              labelText="Link"
              value="url"
            />
          </RadioButtonGroup>
          {this.state.format === "url" && (
            <TextInput
              labelText=""
              helperText="Link"
              id="urlInput"
              invalidText="A valid link is required"
              name="url"
              value={this.state.value}
              onChange={this.handleChange}
            />
          )}
          <RadioButtonGroup
            defaultSelected="url"
            legend="Group Legend"
            name="format"
            valueSelected={this.state.format}
            onChange={this.handleOptionChange}
          >
            <RadioButton
              className={
                (this.state.format === "url" ? "disabled-colour" : "") +
                " review-form-margin"
              }
              id="radio-text"
              labelText="Extract from news source"
              value="text"
            />
          </RadioButtonGroup>

          {this.state.format === "text" && (
            <React.Fragment>
              <div className="review-textarea-label">
                <p>News extract</p>
                <p>{`${this.state.charsLeft}/5000`}</p>
              </div>
              <TextArea
                className="review-form-margin TextArea"
                cols={50}
                labelText=""
                id="articleInput"
                invalidText="Text format error"
                maxLength={5000}
                name="article"
                value={this.state.value}
                onChange={this.handleTextareaChange}
              />
            </React.Fragment>
          )}
        </FormGroup>
        <Button type="submit">Submit news</Button>
      </Form>
     
    );
  }
}

export default ReviewForm;
