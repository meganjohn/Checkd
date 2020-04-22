import React from "react";
// import Axios from "axios";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
} from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar () {
    return (
        <div className="sticky-nav-bar">
          <nav className="nav-bar">
            <div className="left-group">
              <div>
                <Link to="/"> Checkd </Link>
              </div>
              <div className="line-spacer"></div>
              <div>
                <Link to="/newsfeed"> Sumbit News </Link>
              </div>
              <div>
                <Link to="/submit-news"> News Feed </Link>
              </div>
              <div>
                <Link to="/about-us">About us</Link>
              </div>
            </div>
            <div className="right-group">
              <div>
              {this.state.loggedIn && (
                // logo
                  <Link to="/dashboard">Dashboard</Link>
              )}
              {!this.state.loggedIn && (
                // logo
                  <Link to="/login"> Login </Link>
              )}
              {this.state.loggedIn && (
                //logo
                <Link to="/logout"> Logout </Link>
              )}
              </div>
            </div>
          </nav>
        </div>
    );
}

export default NavigationBar;