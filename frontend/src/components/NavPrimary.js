import React, { Component } from "react";
import { withAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import "../css/nav.css";
import "../css/notification.scss";
import notifificationServices from "../services/notificationService";

class nav extends Component {
  state = {
    notifications: [],
  }
  async componentDidMount(){
    const notifications = await notifificationServices.getAllNotifications();
   this.setState({
     notifications,
   })
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
                  {notifications.length > 0 && <span className="badge">{notifications.length}</span> }     
                 </i>
            </Link>
          </div>
          <div className="p-2 ">
            <Link to={`/profile/${user.username}`}>{user.username}</Link>
          </div>
          <div className="p-2">
            <button onClick={handleLogout}>logout</button>
          </div>
        </div>
      </>
    );
  }
}

export default withAuth(nav);
