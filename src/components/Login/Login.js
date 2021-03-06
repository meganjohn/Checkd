import React from "react";
import { auth } from "firebase/app";
import { Form } from "carbon-components-react";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import "./Login.css";

class Login extends React.Component {
  state = {
    email: null,
    password: null,
    step: 1,
    remember: false,
    emailError: null,
    passwordError: null,
    loading: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value.trim(),
    });
  };

  handleRemember = (value, id, event) => {
    this.setState({ remember: value });
  };

  signIn = (event) => {
    const { email, password, remember } = this.state;
    const persistence = remember ? "LOCAL" : "SESSION";
    auth()
      .setPersistence(auth.Auth.Persistence[persistence])
      .then(() => {
        return auth().signInWithEmailAndPassword(email, password);
      })
      .then(() => {
        this.setState({ passwordError: null }, () => {
          this.props.history.push("/dashboard");
        });
      })
      .catch((err) => {
        this.setState({ passwordError: err.message });
      });
    event.preventDefault();
  };

  signInTwitter = () => {
    const provider = new auth.TwitterAuthProvider();
    this.setState({ loading: true }, () => {
      auth().signInWithRedirect(provider);
    });
  };

  signInGoogle = () => {
    const provider = new auth.GoogleAuthProvider();
    this.setState({ loading: true }, () => {
      auth().signInWithRedirect(provider);
    });
  };

  signInRedirect = () => {
    this.setState({ loading: true });
    auth()
      .getRedirectResult()
      .then((result) => {
        // If signed-in user, redirect to dashboard
        this.setState({ loading: false }, () => {
          if (result.user) {
            this.props.history.push("/dashboard");
          }
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  nextStep = (event) => {
    const { email } = this.state;
    auth()
      .fetchSignInMethodsForEmail(email)
      .then((res) => {
        if (res[0] === "password") {
          this.setState({ step: 2, emailError: null });
        } else {
          this.setState({
            emailError: "There was a problem signing in with this email",
          });
        }
      })
      .catch((err) => this.setState({ emailError: err.message }));
    event.preventDefault();
  };

  goBack = () => {
    this.setState({
      step: 1,
      email: null,
      password: null,
      emailError: null,
      passwordError: null,
    });
  };

  componentDidMount() {
    this.signInRedirect();
  }

  render() {
    return (
      <div className="Login">
        <LoadingOverlay loading={this.state.loading} />
        <div className="login-card">
          <h1>Log in</h1>
          <Form onSubmit={this.signIn}>
            <Step1
              handleChange={this.handleChange}
              value={this.state.value}
              step={this.state.step}
              nextStep={this.nextStep}
              signInTwitter={this.signInTwitter}
              signInGoogle={this.signInGoogle}
              emailError={this.state.emailError}
              handleRemember={this.handleRemember}
            />
            <Step2
              handleChange={this.handleChange}
              step={this.state.step}
              email={this.state.email}
              passwordError={this.state.passwordError}
              goBack={this.goBack}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
