import React from "react";
import { TextInput, Button, Checkbox } from "carbon-components-react";
import { ArrowRight16, LogoTwitter32 } from "@carbon/icons-react";
import { Link } from "react-router-dom";
import "./Step1.css";

function Step1(props) {
  if (props.step !== 1) {
    return null;
  }
  return (
    <React.Fragment>
      <p className="login-subheading">
        Don't have a moderator account? <Link to="/">Create an account</Link>
      </p>
      <div className="login-line" />
      <div className="login-input-label">
        <p>Email</p> <Link to="/">Forgot email?</Link>
      </div>
      <TextInput
        id="emailInput"
        invalidText="A valid value is required"
        name="email"
        onChange={props.handleChange}
        value={props.value}
      />
      <Button className="login-continue-button" onClick={props.nextStep}>
        Continue
        <ArrowRight16 aria-label="Continue" className="login-continue-icon" />
      </Button>
      <Checkbox
        defaultChecked
        labelText="Remember me"
        id="checked"
        name="remember"
        className="login-remember-checkbox"
      />
      <div className="login-line" />
      <p className="login-small">Alternative logins</p>
      <div className="login-socials-container" onClick={props.signInTwitter}>
        <p>Log in with Twitter</p>
        <LogoTwitter32 aria-label="Twitter" className="login-twitter-icon" />
      </div>
      <div className="login-socials-container">
        <p>Log in with Google</p>
        <span>
          <i class="fab fa-google" />
        </span>
      </div>
      <div className="login-line" />
    </React.Fragment>
  );
}

export default Step1;
