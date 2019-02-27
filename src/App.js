import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  // NavLink as RNavLink,
  Switch
} from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
// import { User } from "./pages/User";
import { Lab } from "./pages/Lab";
import Landing from "./pages/Landing";
// import { NewProject } from "./pages/NewProject";
import { login, setAuthData } from "./redux/actions";
import { NewExperiment } from "./pages/NewExperiment";
import { withAuthenticator } from "aws-amplify-react/dist/Auth";

// const NavLink = ({ className, ...props }) => (
//   <li className={`p-0 m-0 d-block ${className}`}>
//     <RNavLink
//       className={`px-4 py-2 d-block lead text-secondary`}
//       activeClassName="bg-secondary text-light"
//       {...props}
//     />
//   </li>
// );

const ProtectedLab = withAuthenticator(Lab);

class App extends Component {
  constructor(props) {
    super(props);
    props.setAuthData(props.authData);
  }
  render() {
    console.log(this.props);
    // const { authData } = this.props;
    return (
      <Router>
        <div className="h-100vh mw-100 bg-light">
          <div className="container py-5">
            <Switch>
              <Route path="/landing" exact component={Landing} />
              <Route path="/lab" exact component={ProtectedLab} />
              {/* <Route path="/new-project" exact component={NewProject} /> */}
              <Route path="/new-experiment" exact component={NewExperiment} />
              {/* <Route path="/:user" component={User} /> */}
            </Switch>
            <Route exact path="/" render={() => <Redirect to="/landing" />} />
          </div>
          {/* <nav
            className="col col-sm-3 d-flex bg-white p-0 flex-row
         flex-sm-column justify-content-between"
          >
            <ul className="d-flex flex-column list-unstyled  m-0">
              <NavLink to="/landing">
                <i className="fas fa-info-circle" /> About
              </NavLink>
              <NavLink to="/lab">
                <i className="fas fa-flask" /> Lab
              </NavLink>
            </ul>
            {authData ? (
              <NavLink to={`/${authData.username}`}>
                <i className="fas fa-user-circle" /> {authData.username}
              </NavLink>
            ) : (
              <button
                className="btn btn-secondary btn-outline m-3"
                onClick={this.props.login}
              >
                Login
              </button>
            )}
          </nav> */}
        </div>
      </Router>
    );
  }
}

export default connect(
  state => state,
  { login, setAuthData }
)(App);
