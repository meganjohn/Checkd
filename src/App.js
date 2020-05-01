import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import SubmitNews from "./components/SubmitNews/SubmitNews";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Newsfeed from "./components/Newsfeed/Newsfeed";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardDetail from "./components/DashboardDetail/DashboardDetail";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Moderator from "./components/Moderator/Moderator";
import PasswordReset from "./components/PasswordReset/PasswordReset";
import Footer from "./components/Footer/Footer";
import "./App.css";

class App extends React.Component {
  state = {
    loggedIn: false,
    loading: true,
    isWideViewport: true,
  };

  getAuthState = () => {
    let self = this;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        self.setState({ loggedIn: true, loading: false });
      } else {
        self.setState({ loggedIn: false, loading: false });
      }
    });
  };

  getViewportWidth = () => {
    let self = this;
    if (window.innerWidth < 601) {
      // Viewport not wide enough for full navbar

      self.setState({ isWideViewport: false });
    }
  };

  componentDidMount() {
    this.getAuthState();
    this.getViewportWidth();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavigationBar state={this.state} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/newsfeed" component={Newsfeed} />
            <Route exact path="/submit-news" component={SubmitNews} />
            <Route exact path="/about-us" component={About} />
            <Route
              exact
              path="/dashboard"
              component={(props) => <Dashboard {...props} auth={this.state} />}
            />
            <Route
              exact
              path="/dashboard/:id"
              component={(props) => (
                <DashboardDetail {...props} auth={this.state} />
              )}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route
              exact
              path="/become-a-moderator"
              component={(props) => <Moderator {...props} />}
            />
            <Route
              exact
              path="/password-reset"
              component={(props) => <PasswordReset {...props} />}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
