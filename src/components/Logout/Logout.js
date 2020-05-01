import React from "react";
import { auth } from "firebase/app";
import { Button } from "carbon-components-react";
import "./Logout.css";

class Logout extends React.Component {
  state = {
    error: null,
  };

  signOut = () => {
    auth()
      .signOut()
      .then(() => {
        this.props.history.push("/login");
      })
      .catch((err) => {
        this.setState({ authStatus: err });
      });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="Logout">
        <div className="logout-card">
          <h1>Log out</h1>
          <p>Are you sure you want to log out?</p>
          <div className="logout-buttons-container">
          <Button kind="secondary" className="logout-button" onClick={this.goBack}>No</Button>
          <Button kind="primary" className="logout-button" onClick={this.signOut}>Yes</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Logout;
