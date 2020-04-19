import React from "react";
import { Link } from "react-router-dom";
class Dashboard extends React.Component {
  state={
    loading: true
  }

  
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <ul>
          <li><Link to="/dashboard/1">Moderate submission: articleID=1</Link></li>
          <li><Link to="/dashboard/2">Moderate submission: articleID=2</Link></li>
          <li><Link to="/dashboard/3">Moderate submission: articleID=3</Link></li>
        </ul>
      </div>
    );
  }
}

export default Dashboard;
