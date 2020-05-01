import React from "react";
import "./Moderator.css";
import { auth } from "firebase/app";
import { Form, TextInput, Button } from "carbon-components-react";

class Moderator extends React.Component {
  state = {
    email: null,
    password1: null,
    password2: null,
    emailError: false,
    passwordError: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validateForm = () => {
    const { password1, password2, email } = this.state;
    if (password1 !== password2) {
      this.setState({ passwordError: "passwords must match" });
      return false;
    } else if (typeof password1 !== "string" || typeof password2 !== "string"){
      this.setState({passwordError: "must enter a password"})
      return false;
    } else if (typeof email !== "string" ){
      this.setState({emailError: "must enter an email"})
      return false;
    } else {
      return true;
    }
  };

  signUpModerator = (event) => {
    event.preventDefault();
    const { email, password1 } = this.state;
    this.setState({ emailError: false, passwordError: false });
    this.validateForm() && auth().createUserWithEmailAndPassword(email, password1)
        .then(() => this.props.history.push("/login"))
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            this.setState({ emailError: error.message });
          } else if (error.code === "auth/weak-password") {
            this.setState({ passwordError: error.message });
          } else {
            this.setState({
              emailError: error.message,
              passwordError: error.message,
            });
          }
        });
   
  };

  render() {
    return (
      <div className="Moderator">
        <div className="moderator-card">
          <h1>Become a Moderator</h1>
          <Form onSubmit={this.signUpModerator}>
            <TextInput
              labelText="Email"
              id="emailModerator"
              className="moderator-form-item"
              invalidText={this.state.emailError}
              invalid={this.state.emailError && "true"}
              name="email"
              onChange={this.handleChange}
              value={this.state.value}
            />
            <TextInput.PasswordInput
              labelText="Password"
              hidePasswordLabel="Hide password"
              id="password1"
              className="moderator-form-item"
              invalid={this.state.passwordError && "true"}
              invalidText={this.state.passwordError}
              showPasswordLabel="Show password"
              name="password1"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <TextInput.PasswordInput
              labelText="Repeat Password"
              hidePasswordLabel="Hide password"
              id="password2"
              className="moderator-form-item"
              invalid={this.state.passwordError && "true"}
              invalidText={this.state.passwordError}
              showPasswordLabel="Show password"
              name="password2"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <Button type="submit" className="moderator-button">Create account</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Moderator;
