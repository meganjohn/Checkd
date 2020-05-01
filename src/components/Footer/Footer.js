import React from "react";
// import Axios from "axios";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
} from "react-router-dom";
import "./Footer.css";
import emailIcon from "./email.svg";

function Footer (props) {
    return (
        <div className="footer">
            <div className="left-group">
                © Checkd, 2020
            </div>
            <div className="right-group">
                <a href="mailto:checkd.news@gmail.com">
                <img src={emailIcon} alt="Email icon"></img>
                Contact Us
                </a>
            </div>
        </div>
    );
}

export default Footer;