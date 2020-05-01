import React from "react";
import { auth } from "firebase/app";
import {
  Form,
  TextInput,
  Button,
  ToastNotification,
} from "carbon-components-react";
import { Link } from "react-router-dom";
import "./PasswordReset.css";

class PasswordReset extends React.Component {
  state = {
    email: null,
    sent: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, sent: false });
  };

  handleSubmit = (event) => {
    const { email } = this.state;
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        this.setState({ sent: true });
      })
      .catch((error) => {
        this.setState({ sent: true });
      });
    event.preventDefault();
  };

  render() {
    return (
      <div className="Password">
        {this.state.sent && (
          <ToastNotification
            className="password-notification"
            kind="success"
            iconDescription="close email sent notification"
            caption={<Link to="/login">log in</Link>}
            subtitle="If the account exists, an email has been sent with further instructions"
            timeout={0}
            title="Email sent"
          />
        )}
        <div className="password-card">
          <h1>Reset your password</h1>
          <p className="password-subheading">
            Email me a password reset link
            <p
              className="password-link-underlined"
              onClick={this.props.history.goBack}
            >
              Go back?
            </p>
          </p>
          <div className="password-line" />
          <Form onSubmit={this.handleSubmit}>
            <TextInput
              labelText="Email"
              id="emailModerator"
              className="password-form-item"
              name="email"
              onChange={this.handleChange}
              value={this.state.value}
            />
            <Button className="password-button" type="submit">
              Send email
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default PasswordReset;
