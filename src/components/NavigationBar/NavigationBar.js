import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

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
                    <Link to="/" className="nav-home-link"> Checkd </Link>
                  </div>
                  <div className="line-spacer"></div>
                  <div className="link-div">
                    <Link to="/newsfeed" className="nav-general-link" activeClassName="active-route"> News Feed </Link>
                  </div>
                  <div className="link-div">
                    <Link to="/submit-news" className="nav-general-link" activeClassName="active-route"> Submit News </Link>
                  </div>
                  <div className="link-div">
                    <Link to="/about-us" className="nav-general-link" activeClassName="active-route">About Us</Link>
                  </div>
                </div>
                <div className="right-group">
                  <div className="link-div">
                    {this.props.state.loggedIn && (
                      // logo
                      <Link to="/dashboard" className="nav-general-link" activeClassName="active-route">Dashboard</Link>
                    )}
                    {!this.props.state.loggedIn && (
                      // logo
                      <Link to="/login" className="nav-general-link" activeClassName="active-route">Moderator Login </Link>
                    )}
                    {this.props.state.loggedIn && (
                      //logo
                      <Link to="/logout" className="nav-general-link" activeClassName="active-route"> Logout </Link>
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
                      <Link to="/newsfeed" className="nav-general-link" onClick={this.onLinkClick} activeClassName="active-route"> News Feed </Link>
                    </li>
                    <li className="link-div">
                      <Link to="/submit-news" className="nav-general-link" onClick={this.onLinkClick} activeClassName="active-route"> Submit News </Link>
                    </li>
                    <li className="link-div">
                      <Link to="/about-us" className="nav-general-link" onClick={this.onLinkClick} activeClassName="active-route">About Us</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="home-link-and-spacer">
                  <div className="line-spacer"></div>

                  <div className="link-div">
                    <Link to="/" onClick={this.onLinkClick} className="nav-home-link"> Checkd </Link>
                  </div>
              </div>
              <div className="right-group">
                <div className="link-div">
                  {this.props.state.loggedIn && (
                    // logo
                    <Link to="/dashboard" onClick={this.onLinkClick} className="nav-general-link" activeClassName="active-route">Dashboard</Link>
                  )}
                  {!this.props.state.loggedIn && (
                    // logo
                    <Link to="/login" onClick={this.onLinkClick} className="nav-general-link" activeClassName="active-route">Moderator Login </Link>
                  )}
                  {this.props.state.loggedIn && (
                    //logo
                    <Link to="/logout" onClick={this.onLinkClick} className="nav-general-link" activeClassName="active-route"> Logout </Link>
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
