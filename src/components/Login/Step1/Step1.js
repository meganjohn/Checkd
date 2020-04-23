import React from "react";
import { FormGroup, TextInput, Button } from "carbon-components-react";
import { Link } from "react-router-dom";

function Step1(props) {
  if (props.step !== 1) {
    return null;
  }
  return (
    <React.Fragment>
      <p>Don't have a moderator account? <Link to="/">Create an account</Link></p>
      <hr />
    <FormGroup>
      <div><p>Email</p> <Link to="/">Forgot email?</Link></div>
      <TextInput
        helperText="try test@gmail.com"
        id="emailInput"
        invalidText="A valid value is required"
        placeholder="Email"
        name="email"
        onChange={props.handleChange}
        value={props.value}
      />
    </FormGroup>
    <Button>Continue</Button>
    <hr />
    <small>Alternative logins</small>
    <div>
      Log in with Twitter
    </div>
    <div>
      Log in with Google
    </div>
    <hr />
    </React.Fragment>
  );
}

export default Step1;
