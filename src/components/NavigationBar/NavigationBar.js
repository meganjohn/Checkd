import React from "react";
import { 
    Link,
    NavLink
       } from "react-router-dom";
import "./NavigationBar.css";
import loginIcon from "./login-icon.svg";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
    this.onLinkClick = this.onLinkClick.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
  }

  render() {
    return (
      <>
        <div className="wide-screen">
          <section className="sticky-nav-bar">
            <div className="nav-bar">
              <nav>
                <div className="left-group">
                  <div className="link-div">
                    <NavLink to="/" className="nav-home-link" activeClassName="active-home"> Checkd </NavLink>
                  </div>
                  <div className="line-spacer"></div>
                  <div className="link-div">
                    <NavLink to="/newsfeed" className="nav-general-link" activeClassName="active-route"> News Feed </NavLink>
                  </div>
                  <div className="link-div">
                    <NavLink to="/submit-news" className="nav-general-link" activeClassName="active-route"> Submit News </NavLink>
                  </div>
                  <div className="link-div">
                    <NavLink to="/about-us" className="nav-general-link" activeClassName="active-route">About Us</NavLink>
                  </div>
                </div>
                <div className="right-group">
                  <div className="link-div">
                    {this.props.state.loggedIn && (
                      <NavLink to="/dashboard" className="nav-general-link" activeClassName="active-route">Dashboard</NavLink>
                    )}
                    {!this.props.state.loggedIn && (
                      <NavLink to="/login" className="nav-general-link" activeClassName="active-route">
                        <img src={loginIcon} alt="Login icon"></img>
                        Moderator Login 
                        </NavLink>
                    )}
                    {this.props.state.loggedIn && (
                      <NavLink to="/logout" className="nav-general-link" activeClassName="active-route">
                        <img src={loginIcon} alt="Login icon"></img>
                        Logout
                        </NavLink>
                    )}
                  </div>
                </div>
              </nav>
            </div>
          </section>
        </div>
        <div className="narrow-screen">
          <section className="sticky-nav-bar">
            <nav>
              <div className="burger-menu">
                <div className="burger-menu-link" onClick={this.onMenuClick}>
                  <div id="menu-icon" className={this.state.open ? "open" : ""}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className={this.state.open ? "nav-open" : " closed"}>
                  <ul>
                    <li className="link-div">
                      <NavLink to="/newsfeed" className="nav-general-link" onClick={this.onLinkClick} activeClassName="active-route"> 
                        News Feed 
                      </NavLink>
                    </li>
                    <li className="link-div">
                      <NavLink to="/submit-news" className="nav-general-link" onClick={this.onLinkClick} activeClassName="active-route">
                        Submit News 
                      </NavLink>
                    </li>
                    <li className="link-div">
                      <NavLink to="/about-us" className="nav-general-link" onClick={this.onLinkClick} activeClassName="active-route">
                        About Us
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="home-link-and-spacer">
                  <div className="line-spacer"></div>

                  <div className="link-div">
                    <NavLink to="/" onClick={this.onLinkClick} className="nav-home-link" activeClassName="active-home"> Checkd </NavLink>
                  </div>
              </div>
              <div className="right-group">
                <div className="link-div">
                  {this.props.state.loggedIn && (
                    <NavLink to="/dashboard" onClick={this.onLinkClick} className="nav-general-link" activeClassName="active-route">
                      Dashboard
                    </NavLink>
                  )}
                  {!this.props.state.loggedIn && (
                    <NavLink to="/login" onClick={this.onLinkClick} className="nav-general-link" activeClassName="active-route">
                      <img src={loginIcon} alt="Login icon"></img>
                      Moderator Login
                      </NavLink>
                  )}
                  {this.props.state.loggedIn && (
                    <NavLink to="/logout" onClick={this.onLinkClick} className="nav-general-link" activeClassName="active-route">
                      <img src={loginIcon} alt="Login icon"></img>
                      Logout
                      </NavLink>
                  )}
                </div>
              </div>
            </nav>
          </section>
        </div>
      </>
    );
  }

  onLinkClick() {
    this.setState({
      open: false
    });
  }

  onMenuClick() {
    const open = !this.state.open;
    this.setState({
      open: open
    });
  }
}

export default NavigationBar;
