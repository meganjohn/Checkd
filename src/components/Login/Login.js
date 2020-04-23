import React from "react";
import firebase from "firebase";
import { Form } from "carbon-components-react";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import "./Login.css";

class Login extends React.Component {
  state = {
    authStatus: null,
    email: null,
    password: null,
    step: 1,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  signIn = (event) => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ authStatus: "You are logged in" });
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        this.setState({ authStatus: err.message });
      });
    event.preventDefault();
  };

  render() {
    const { authStatus } = this.state;
    return (
      <div className="Login">
        <div className="login-card">
          <h1>Log in</h1>
          <Form onSubmit={this.signIn}>
            <Step1
              handleChange={this.handleChange}
              value={this.state.value}
              step={this.state.step}
            />
            <Step2 handleChange={this.handleChange} step={this.state.step} />
          </Form>
          <p>Forgot Password?</p>
          <p>Auth status: {authStatus}</p>
        </div>
      </div>
    );
  }
}

export default Login;
