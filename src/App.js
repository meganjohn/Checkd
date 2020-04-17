import React from "react";
import ReviewForm from "./components/ReviewForm/ReviewForm";
import Auth from "./components/Auth/Auth";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/"> Home </Link>
            </li>
            <li>
              <Link to="/submit-news"> Submit News </Link>
            </li>
            <li>
              <Link to="/admin-login"> Admin Login </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" render={() => <h1> Welcome to Checkd </h1>} />
          <Route path="/submit-news" component={ReviewForm} />
          <Route path="/admin-login" component={Auth} />
          <Route
            path="/admin-dashboard"
            render={() => <h1> Admin Dashboard </h1>}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
