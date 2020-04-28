import React from "react";
// import Axios from "axios";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
} from "react-router-dom";
import "./NavigationBar.css";

function NavigationBarLinks (props) {
    return (
        
        <div className="link-div">
            <Link to="/newsfeed" className="nav-general-link"> News Feed </Link>
        </div>
        <div className="link-div">
            <Link to="/submit-news" className="nav-general-link"> Submit News </Link>
        </div>
        <div className="link-div">
            <Link to="/about-us" className="nav-general-link">About us</Link>
        </div>
    );
};