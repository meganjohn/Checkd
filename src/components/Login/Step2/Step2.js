import React from "react";
import { TextInput, Button } from "carbon-components-react";
import { ArrowRight16 } from "@carbon/icons-react";
import { Link } from "react-router-dom";
import "./Step2.css";

function Step2(props) {
  if (props.step !== 2) {
    return null;
  }
  return (
    <React.Fragment>
      <p className="login-subheading">
        Logging in as {props.email} <p className="login-link-underlined" onClick={props.goBack}>Not you?</p>
      </p>
      <div className="login-line" />
      <div className="login-input-label">
        <p>Password</p> <Link to="/password-reset">Forgot password?</Link>
      </div>
        <TextInput.PasswordInput
          hidePasswordLabel="Hide password"
          id="passwordInput"
          invalid={props.passwordError? true : false}
          invalidText={props.passwordError}
          placeholder="Password"
          showPasswordLabel="Show password"
          name="password"
          onChange={props.handleChange}
        />
      <Button className="login-continue-button margin-bottom" onClick={props.nextStep} type="submit">
        Login
        <ArrowRight16 aria-label="Continue" className="login-continue-icon" />
      </Button>
    </React.Fragment>
  );
}

export default Step2;
