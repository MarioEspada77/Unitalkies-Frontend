import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import PrivateView from "./views/PrivateView";
import Login from "./views/auth/Login";
import Signup from "./views/auth/Signup";
import { withAuth } from "./Context/AuthContext";

import "./css/App.css";
import PrivateRoute from "./components/PrivateRoute";
import AnonRoute from "./components/AnonRoute";
import Home from "./views/Home";
import UserProfileView from "./views/UserProfileView";
import UserFollowers from "./components/UserFollowers";
import UserFollowing from "./components/UserFollowing";
import Notifications from "./components/Notifications";
import { ThemeProvider } from "styled-components";
import { theme, GlobalStyle } from "./styles";
import NavPrimary from "./components/NavPrimary";

class App extends Component {
  state = {
    actualTheme: theme["light"]
  };

  handleTheme = () => {
    const { actualTheme } = this.state;
    if (actualTheme.theme === "light") {
      this.setState({
        actualTheme: theme["dark"]
      });
    } else {
      this.setState({
        actualTheme: theme["light"]
      });
    }
  };
  render() {
    const { handleLogout } = this.props;
    const { actualTheme } = this.state;
    return (
      <ThemeProvider theme={actualTheme}>
        <GlobalStyle />
        <div className="background-page">
          <Router>
            <NavPrimary
              handleTheme={this.handleTheme}
              actualTheme={actualTheme}
            />
            <AnonRoute exact path="/login" component={Login} />
            <AnonRoute exact path="/signup" component={Signup} />
            <PrivateRoute exact path="/home" component={Home} />
            <PrivateRoute
              exact
              path="/profile/:username"
              component={UserProfileView}
            />
            <PrivateRoute
              exact
              path="/followers/:username"
              component={UserFollowers}
            />
            <PrivateRoute
              exact
              path="/following/:username"
              component={UserFollowing}
            />
            <PrivateRoute
              exact
              path="/notifications/all"
              component={Notifications}
            />
          </Router>
        </div>
      </ThemeProvider>
    );
  }
}

export default withAuth(App);
