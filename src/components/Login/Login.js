import React from "react";
import firebase from "firebase";
import { Form, FormGroup, TextInput, Button } from "carbon-components-react";

class Login extends React.Component {
  state = {
    authStatus: null,
    email: null,
    password: null,
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
      })
      .catch((err) => {
        this.setState({ authStatus: err.message });
      });
      event.preventDefault();
  };

  render() {
    const { authStatus} = this.state;
    return (
      <div>
        <div>
          <h1>Admin Login</h1>
          <h2>CHECKD</h2>
          <h3>login</h3>
          <Form onSubmit={this.signIn}>
            <FormGroup>
              <TextInput
                helperText="try test@gmail.com"
                id="emailInput"
                invalidText="A valid value is required"
                placeholder="Email"
                name="email"
                onChange={this.handleChange}
                value={this.state.value}
              />
            </FormGroup>
            <FormGroup>
              <TextInput.PasswordInput
                helperText="try password123"
                hidePasswordLabel="Hide password"
                id="passwordInput"
                invalidText="A valid value is required"
                placeholder="Password"
                showPasswordLabel="Show password"
                name="password"
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button kind="primary" tabIndex={0} type="submit">
              LOGIN
            </Button>
          </Form>
          <p>Forgot Password?</p>
          <p>Auth status: {authStatus}</p>
        </div>
      </div>
    );
  }
}

export default Login;