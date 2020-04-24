import React from "react";
import firebase from "firebase";
import { Form } from "carbon-components-react";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import "./Login.css";
const provider = new firebase.auth.TwitterAuthProvider()

class Login extends React.Component {
  state = {
    authStatus: null,
    email: null,
    password: null,
    step: 1,
    remember: false,
    emailError: null
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value.trim(),
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
        console.log(err)
        this.setState({ authStatus: err.message });
      });
    event.preventDefault();
  };

  signInTwitter = () => {
    firebase.auth().signInWithRedirect(provider)
    .then((result) => {
      console.log(result.user);
      this.props.history.push("/dashboard");
    }).catch((err) => {
      this.state({ authStatus: err.message})
    })
  }

  nextStep = (event) => {
    const { email } = this.state;
    firebase.auth()
    .fetchSignInMethodsForEmail(email)
    .then((res) => {
      if(res[0] === "password"){
        this.setState({step: 2})
      } else {
        this.setState({emailError: "There was a problem signing in with this email"})
      }
    })
    .catch((err) => this.setState({emailError: err.message}))
    event.preventDefault();
  }

  render() {
    const { authStatus } = this.state;
    console.log(this.state)
    return (
      <div className="Login">
        <div className="login-card">
          <h1>Log in</h1>
          <Form onSubmit={this.signIn}>
            <Step1
              handleChange={this.handleChange}
              value={this.state.value}
              step={this.state.step}
              nextStep={this.nextStep}
              signInTwitter={this.signInTwitter}
            />
            <Step2 handleChange={this.handleChange} step={this.state.step} />
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
