import React from "react";
import firebase from "firebase";
import { Form } from "carbon-components-react";
import LoadingOverlay from "../LoadingOverlay/LoadingOveray";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import "./Login.css";
const provider = new firebase.auth.TwitterAuthProvider();

class Login extends React.Component {
  state = {
    email: null,
    password: null,
    step: 1,
    remember: false,
    emailError: null,
    passwordError: null,
    loading: false
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
    this.setState({loading: true}, () => { 
      firebase
      .auth()
      .signInWithRedirect(provider);
    })
  }
  
  signInRedirect = () => {
    this.setState({loading: true})
    firebase.auth().getRedirectResult().then((result) => {
      // If signed-in user, redirect to dashboard
      this.setState({loading: false}, () => {
        if(result.user){
        this.props.history.push("/dashboard")
        } else {
          console.log("no user")
        }
      })
    }).catch((error) => { 
      this.setState({loading: false})
    });
  }

  nextStep = (event) => {
    const { email } = this.state;
    firebase
      .auth()
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

  componentDidMount(){
    this.signInRedirect();
  }

  render() {
    return (
      <React.Fragment>
      <LoadingOverlay loading={this.state.loading} />
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
              emailError={this.state.emailError}
            />
            <Step2
              handleChange={this.handleChange}
              step={this.state.step}
              email={this.state.email}
              passwordError={this.state.passwordError}
            />
          </Form>
        </div>
      </div>
      </React.Fragment>
    );
  }
}

export default Login;
