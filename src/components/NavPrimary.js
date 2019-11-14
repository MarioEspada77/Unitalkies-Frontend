import React, { Component } from "react";
import { withAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import "../css/nav.css";
import "../css/notification.scss";
import notifificationServices from "../services/notificationService";
import "../dropdown.js";
import image from "../img/image_profile.jpg";

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
  render() {
    const { user, handleLogout } = this.props;
    const { notifications } = this.state;
    return (
      <>
        <div className="fixed-top primary-color padding-nav d-flex">
          <div className="p-2 mr-auto ">Unitalkies</div>
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
              <div class="dropdown-menu">
                <a class="dropdown-item">
                  <Link to={`/profile/${user.username}`}>Ver perfil</Link>
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" onClick={handleLogout}>
                  Cerrar sesión
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withAuth(nav);
