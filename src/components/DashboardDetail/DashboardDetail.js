import React from "react";

class DashboardDetail extends React.Component {
  render() {
    const { loading, loggedIn } = this.props.auth;
    if (loading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    } else if (!loading && !loggedIn) {
      return (
        <div>
          <p>Unauthorised</p>
          <button onClick={() => this.props.history.push("/login")}>
            Please login
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Moderate submission - article id={this.props.match.params.id}</h1>
        </div>
      );
    }
  }
}

export default DashboardDetail;
