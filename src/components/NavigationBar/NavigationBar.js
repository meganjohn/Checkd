import React from "react";
// import Axios from "axios";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
} from "react-router-dom";
import "./NavigationBar.css";
import NavigationBarLinks from "./NavigationBarLinks.js";

function NavigationBar (props) {
    return (
        <section className="sticky-nav-bar">
          <div className="nav-bar">
              <div className="link-div">
                <Link to="/" className="nav-home-link"> Checkd </Link>
              </div>
              <nav>
                <div className="line-spacer"></div>
                <NavigationBarLinks viewport={this.viewport}/>
                <div className="right-group">
                  <div className="link-div">
                    {props.state.loggedIn && (
                  // logo
                      <Link to="/dashboard" className="nav-general-link">Dashboard</Link>
                    )}
                    {!props.state.loggedIn && (
                    // logo
                      <Link to="/login" className="nav-general-link"> Login </Link>
                    )}
                    {props.state.loggedIn && (
                      //logo
                      <Link to="/logout" className="nav-general-link"> Logout </Link>
                    )}
                  </div>
                </div>
              </nav>
            </div>
        </section>
    );
}

export default NavigationBar;