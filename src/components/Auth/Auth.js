import React from "react";
import axios from "axios";
import firebase from "firebase";
import { Form, FormGroup, TextInput, Button } from "carbon-components-react";

class Auth extends React.Component {
  state = {
    authStatus: null,
    response: null,
    email: null,
    password: null,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  sendRequest = () => {
    if (firebase.auth().currentUser) {
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
          axios
            .get("/", {
              headers: {
                AuthToken: idToken,
              },
            })
            .then((res) => {
              this.setState({ response: res.data.message });
            })
            .catch((error) => {
              this.setState({ response: error });
            });
        })
        .catch((error) => {
          this.setState({ response: "Error getting auth token" });
        });
    } else {
      axios
        .get("/")
        .then((res) => {
          this.setState({ response: res.data.message });
        })
        .catch((error) => {
          this.setState({ response: error });
        });
    }
  };

  signIn = (event) => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ authStatus: "Authorised" });
      })
      .catch((err) => {
        console.log(err.message)
        this.setState({ authStatus: err.message });
      });
      event.preventDefault();
  };

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ authStatus: "Unauthorised" });
      })
      .catch((err) => {
        this.setState({ authStatus: err });
      });
  };

  render() {
    const { authStatus, response } = this.state;
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
                id="test2"
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
                id="test2"
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
          <p>Response: {response}</p>
        </div>
      </div>
    );
  }
}

export default Auth;
