import React from "react";
import { Link } from "react-router-dom";
class Dashboard extends React.Component {
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
          <button onClick={()=>this.props.history.push("/login")}>Please login</button>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Dashboard</h1>
          <ul>
            <li>
              <Link to="/dashboard/1">Moderate submission: articleID=1</Link>
            </li>
            <li>
              <Link to="/dashboard/2">Moderate submission: articleID=2</Link>
            </li>
            <li>
              <Link to="/dashboard/3">Moderate submission: articleID=3</Link>
            </li>
          </ul>
        </div>
      );
    }
  }
}

export default Dashboard;
