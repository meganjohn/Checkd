import React from "react";
// import Axios from "axios";
import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
} from "react-router-dom";
import "./Footer.css";

function Footer (props) {
    return (
        <div className="footer">
            <div className="left-group">
                © Checkd, 2020
            </div>
            <div className="right-group">
                <Link to="mailto:checkd.news@gmail.com">
                Contact Us
                </Link>
            </div>
        </div>
    );
}

export default Footer;