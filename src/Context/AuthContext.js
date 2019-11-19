import React, { Component, createContext } from "react";
import authService from "../services/authService";
import styled from "styled-components";

const Loading = styled.div`
  margin-top: 100px;
  text-align: center;
`;

const AuthContext = createContext();

const Provider = AuthContext.Provider;

const AuthConsumer = AuthContext.Consumer;

export const withAuth = Comp => {
  return class WithAuth extends Component {
    render() {
      return (
        <AuthConsumer>
          {({
            isLoading,
            isLoggedin,
            user,
            handleLogin,
            handleLogout,
            handleSignup
          }) => (
            <Comp
              {...this.props}
              isLoading={isLoading}
              isLoggedin={isLoggedin}
              user={user}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
              handleSignup={handleSignup}
            />
          )}
        </AuthConsumer>
      );
    }
  };
};

export default class AuthProvider extends Component {
  state = {
    isLoggedin: false,
    user: undefined,
    isLoading: true
  };

  componentDidMount() {
    authService
      .me()
      .then(user => {
        this.setState({
          isLoggedin: true,
          user,
          isLoading: false
        });

        console.log("me", user);
      })
      .catch(() => {
        this.setState({
          isLoading: false
        });
      });
  }

  handleLogin = user => {
    authService
      .login(user)
      .then(loggedUser => {
        this.setState({
          isLoggedin: true,
          user: loggedUser,
          isLoading: false
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false
        });
      });
  };
  handleSignup = user => {
    authService
      .signup(user)
      .then(registredUser => {
        this.setState({
          isLoggedin: true,
          user: registredUser,
          isLoading: false
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false
        });
      });
  };

  handleLogout = () => {
    this.setState({
      isLoading: true
    });
    authService
      .logout()
      .then(() => {
        this.setState({
          isLoggedin: false,
          user: undefined,
          isLoading: false
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          isLoggedin: false,
          user: undefined
        });
      });
  };

  render() {
    const { isLoading, isLoggedin, user } = this.state;
    const { children } = this.props;
    if (isLoading) {
      return (
        <Loading>
          <div className="spinner-border loading"></div>
        </Loading>
      );
    } else {
      return (
        <Provider
          value={{
            isLoading,
            isLoggedin,
            user,
            handleLogin: this.handleLogin,
            handleLogout: this.handleLogout,
            handleSignup: this.handleSignup
          }}
        >
          {children}
        </Provider>
      );
    }
  }
}
