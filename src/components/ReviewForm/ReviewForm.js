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

class ReviewForm extends React.Component {
  state = {
    url: null,
    article: null,
    format: "url"
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleOptionChange = (value, name,event) => {
    console.log(value)
    this.setState({[name]: value})
  }

  handleSubmit = (event) => {
    const { url, article } = this.state;
    Axios.post("/api/v1/submit", { url: url, article: article })
      .then((res) => {
        console.log(res.data);
        alert(
          `you sent this url: ${res.data?.url} \n and this article: ${res.data?.article}
           which has a ${res.data?.sentiment} sentiment and
           a ${res.data?.degree} ${res.data?.direction} political bias
           and an objectivity of ${res.data?.objectivity} and
           polarity of ${res.data?.polarity}`
        );
      })
      .catch((error) => console.error(error));
    event.preventDefault();
  };



  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <RadioButtonGroup
          defaultSelected="url"
          legend="Group Legend"
          name="format"
          valueSelected={this.state.format}
          onChange={this.handleOptionChange}
        >
          <RadioButton
            id="radio-1"
            labelText="Link"
            value="url"
          />
           </RadioButtonGroup>

{this.state.format === "url" && <TextInput
            helperText="Link"
            id="emailInput"
            invalidText="A valid value is required"
            placeholder="Email"
            name="url"
            value={this.state.value}
            onChange={this.handleChange}
          />}
         <RadioButtonGroup
          defaultSelected="url"
          legend="Group Legend"
          name="format"
          valueSelected={this.state.format}
          onChange={this.handleOptionChange}
        >
          <RadioButton
            id="radio-2"
            labelText="Extract from news source"
            value="text"
          />
          </RadioButtonGroup>
          

{this.state.format === "text" && <TextArea
            cols={50}
            helperText="News extract"
            id="test5"
            invalidText="Invalid error message."
            placeholder="Placeholder text"
            rows={4}
            name="article"
            value={this.state.value}
            onChange={this.handleChange}
          />}
       
      
          
      
        <Button>Submit news</Button>
      </Form>
    );
  }
}

export default ReviewForm;
