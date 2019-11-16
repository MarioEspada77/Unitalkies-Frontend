import React, { Component } from "react";
import { withAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import "../css/nav.css";
import notifificationServices from "../services/notificationService";
import "../dropdown.js";
import image from "../img/image_profile.jpg";
import styled from "styled-components";

const NavColor = styled.div`
  background-color: ${({ theme }) => theme.boxColor};
  color: ${({ theme }) => theme.color}
  border-bottom: 2px solid #d9d9d9;
`;
const DropDown = styled.div`
  background-color: ${({ theme }) => theme.boxColor};
  color: ${({ theme }) => theme.color};
`;
const ButtonWritePost = styled.button`
  display: inline-block;
  background-color: ${({ theme }) => theme.primary};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 0.25rem;
  width: 80px;
  text-decoration: none;
  color: ${({ theme }) => theme.primary};
  &:a {
    text-decoration: none;
  }
`;
const NotificationBell = styled.i`
  background-color: ${({ theme }) => theme.boxColor};
  color: ${({ theme }) => theme.secondary};
  text-decoration: none;
  position: relative;
  display: inline-block;
  border-radius: 2px;
  margin-top: 12px;
  margin-right: 10px;
  &:hover {
    color: tomato;
  }
`;
const NotificationSpan = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  padding: -2px;
  border-radius: 50%;
  background: red;
  color: ${({ theme }) => theme.color};
`;

class nav extends Component {
  state = {
    notifications: []
  };
  async componentDidMount() {
    const notifications = await notifificationServices.getAllNotifications();
    this.setState({
      notifications
    });
  }
  handleChangeTheme = e => {
    const { handleTheme, actualTheme } = this.props;
    handleTheme();
  };
  render() {
    const { user, handleLogout, actualTheme } = this.props;
    const { notifications } = this.state;
    return (
      <>
        <NavColor className="fixed-top padding-nav d-flex">
          <div className="p-2 mr-auto ">Unitalkies</div>
          <>
            {user ? (
              <>
                <div className="p-2 ">
                  <Link to={`/notifications/all`}>
                    <NotificationBell className="fa fa-bell">
                      {notifications.length > 0 && (
                        <NotificationSpan>
                          {notifications.length}
                        </NotificationSpan>
                      )}
                    </NotificationBell>
                  </Link>
                </div>
                <div className="p-2 ">
                  <div class="btn-group">
                    <img
                      src={image}
                      alt="dropdown-toggle"
                      className="rounded-circle dropdown-toggle"
                      width="40"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      ria-expanded="false"
                    />
                    <DropDown className="dropdown-menu">
                      <a class="dropdown-item">
                        <Link to={`/profile/${user.username}`}>Ver perfil</Link>
                      </a>
                      <a className="dropdown-item">
                        <a onClick={this.handleChangeTheme}>
                          {actualTheme.theme === "light"
                            ? "Cambiar a modo oscuro"
                            : "Cambiar a modo claro"}
                        </a>
                      </a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" onClick={handleLogout}>
                        Cerrar sesión
                      </a>
                    </DropDown>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="p-2">
                  <ButtonWritePost>
                    <a>
                      <Link style={{ textDecoration: "none" }} to={`/login`}>
                        Login
                      </Link>
                    </a>
                  </ButtonWritePost>
                </div>
                <div className="p-2">
                  <ButtonWritePost>
                    <a>
                      <Link style={{ textDecoration: "none" }} to={`/signup`}>
                        Signup
                      </Link>
                    </a>
                  </ButtonWritePost>
                </div>
              </>
            )}
          </>
        </NavColor>
      </>
    );
  }
}

export default withAuth(nav);
