import React, { Component } from "react";
import { withAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import "../css/nav.css";
import "../css/notification.scss";
import notifificationServices from "../services/notificationService";
import "../dropdown.js";
import image from "../img/image_profile.jpg";
import styled from "styled-components";

const NavColor = styled.div`
  background-color: ${({ theme }) => theme.boxColor};
  color: ${({ theme }) => theme.color}
  border-bottom: 2px solid #d9d9d9;
`
const DropDown = styled.div`
  background-color: ${({ theme }) => theme.boxColor};
  color: ${({ theme }) => theme.color}
`

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
  handleChangeTheme = e =>{
    const { handleTheme, actualTheme} = this.props;
    handleTheme();
  }
  render() {
    const { user, handleLogout, actualTheme} = this.props;
    const { notifications } = this.state;
    return (
      <>
      <NavColor className="fixed-top padding-nav d-flex">
          <div className="p-2 mr-auto ">Unitalkies</div>
            <>
            {user ?
            <>
              <div className="p-2 ">
                  <Link to={`/notifications/all`}>
                      <i className="fa fa-bell notification">
                          {notifications.length > 0 && (
                            <span className="badge">{notifications.length}</span>
                          )}
                      </i>
                  </Link>
                </div>
                <div className="p-2 ">
                    <div class="btn-group">
                        <img src={image} alt="dropdown-toggle" className="rounded-circle dropdown-toggle" width="40" data-toggle="dropdown" aria-haspopup="true" ria-expanded="false"/>
                            <DropDown className="dropdown-menu">
                                  <a class="dropdown-item">
                                    <Link to={`/profile/${user.username}`}>Ver perfil</Link>
                                  </a>
                                  <a className="dropdown-item">
                                    <a onClick={this.handleChangeTheme}>{actualTheme.theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}</a>
                                  </a>
                                 <div class="dropdown-divider"></div>
                                 <a class="dropdown-item" onClick={handleLogout}>
                                    Cerrar sesión
                                  </a>
                            </DropDown>
                     </div>
                 </div> 
                </>
              : 
              <>
              <div className="p-2">
                <Link to={`/login`}>Login</Link>
              </div>
              <div className="p-2">
                <Link to={`/login`}>Signup</Link>
              </div>
              </>
                }
        </>
        </NavColor>
      </>
    );
  }
}

export default withAuth(nav);
