import React from "react";
import firebase from "firebase";

class Logout extends React.Component {
  state = {
    authStatus: null,
  };

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ authStatus: "You are logged out" });
        this.props.history.push("/login");
      })
      .catch((err) => {
        this.setState({ authStatus: err });
      });
  };

  render() {
    const { authStatus } = this.state;
    return (
      <div>
        <div>
          <h1>Admin Logout</h1>
          <h2>CHECKD</h2>
          <h3>logout</h3>
          <p>Auth status: {authStatus}</p>
          <button onClick={this.signOut}>Sign Out</button>
        </div>
      </div>
    );
  }
}

export default Logout;
