import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import firebase from "firebase";
import SubmitNews from "./components/SubmitNews/SubmitNews";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import Newsfeed from "./components/Newsfeed/Newsfeed";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardDetail from "./components/DashboardDetail/DashboardDetail";
import "./App.css";

class App extends React.Component {
  state = {
    loggedIn: false,
    loading: true
  };

  getAuthState = () => {
    let self = this;
    firebase.auth().onAuthStateChanged(function (user) {
      console.log(user);
      if (user) {
        // User is logged in.

        self.setState({ loggedIn: true, loading:false });
      } else {
        // No user is signed in.
        self.setState({ loggedIn: false, loading:false });
      }
    });
  };

  componentDidMount() {
    this.getAuthState();
  }

  render() {
    return (
      <Router>
        <div className="App">
          {/*<!------ Navbar start-------->*/}
          <nav>
            <ul>
              <li>
                <Link to="/"> Home </Link>
              </li>
              <li>
                <Link to="/newsfeed"> Newsfeed </Link>
              </li>
              <li>
                <Link to="/submit-news"> Submit News </Link>
              </li>
              <li>
                <Link to="/about-us">About us</Link>
              </li>
              {this.state.loggedIn && (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}
              {!this.state.loggedIn && (
                <li>
                  <Link to="/login"> Admin Login </Link>
                </li>
              )}
              {this.state.loggedIn && (
                <li>
                  <Link to="/logout"> Admin Logout </Link>
                </li>
              )}
            </ul>
          </nav>
          {/*<!------ Navbar end -------->*/}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/newsfeed" component={Newsfeed} />
            <Route exact path="/submit-news" component={SubmitNews} />
            <Route exact path="/about-us" component={About} />
            <Route exact path="/dashboard" component={(props) => <Dashboard {...props} auth={this.state}/>} />
            <Route exact path="/dashboard/:id" component={(props) => <DashboardDetail {...props} auth={this.state} />} />
            <Route exact path="/login" component={Login} /> 
            <Route exact path="/logout" component={Logout} /> 
          </Switch>
          {/*--   Footer start   ---*/}

          {/*--   Footer end   ---*/}
        </div>
      </Router>
    );
  }
}

export default App;
