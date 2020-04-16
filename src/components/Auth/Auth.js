import React from "react";
import axios from "axios";
import firebase from "firebase";

class Auth extends React.Component {
  state = {
    authStatus: null,
    response: null,
  };

  sendRequest = () => {
    if (firebase.auth().currentUser) {
      firebase.auth().currentUser.getIdToken(true)
      .then((idToken) => {
        axios.get('/', {
          headers: {
            'AuthToken': idToken
          }
        }).then((res) => {
          this.setState({response: res.data.message})
        }).catch((error) => {
          this.setState({response: error})
        })
      }).catch((error) => {
        this.setState({response: "Error getting auth token"})
      });
    } else {
      axios.get('/').then((res) => {
        this.setState({response: res.data.message})
      }).catch((error) => {
        this.setState({response: error})
      })
    }
  }

  signIn = () => {
    firebase.auth()
    .signInWithEmailAndPassword("test@gmail.com", "password123")
    .then(() => {
      this.setState({authStatus: "Authorised"})
    }).catch((err) => {
      this.setState({authStatus: err})
    })
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.setState({authStatus: "Unauthorised"})
    }).catch((err) => {
      this.setState({authStatus: err})
    })
  }

  render() {
    const { authStatus, response } = this.state;
    return (
      <div>
        <p>Auth status: {authStatus}</p>
        <p>Response: {response}</p>
        <button onClick={this.signIn}>Sign In</button>
        <button onClick={this.signOut}>Sign Out</button>
        <button onClick={this.sendRequest}>Send Request</button>
      </div>
    );
  }
}

export default Auth;