import React from "react";
// import Axios from "axios";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
} from "react-router-dom";
import "./NavigationBar.css";
<<<<<<< HEAD
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
                <NavigationBarLinks isWideViewport={this.isWideViewport}/>
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
=======

function NavigationBar (props) {
    return (
        <div className="sticky-nav-bar">
          <nav className="nav-bar">
            <div className="left-group">
              <div className="link-div">
                <Link to="/" className="nav-home-link"> Checkd </Link>
              </div>
              <div className="line-spacer"></div>
              <div className="link-div">
                <Link to="/newsfeed" className="nav-general-link"> Submit News </Link>
              </div>
              <div className="link-div">
                <Link to="/submit-news" className="nav-general-link"> News Feed </Link>
              </div>
              <div className="link-div">
                <Link to="/about-us" className="nav-general-link">About us</Link>
              </div>
            </div>
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
>>>>>>> 6d122d4e763b0263353c65739bbab55e026b7f62
    );
}

export default NavigationBar;