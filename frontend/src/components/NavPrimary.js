import React, { Component } from "react";
import { withAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import "../css/nav.css";

class nav extends Component {
  render() {
    const { user } = this.props;
    return (
      <>
        <div className="fixed-top primary-color padding-nav d-flex">
          <div class="p-2 mr-auto ">Unitalkies</div>
          <div class="p-2 ">Notificaciones</div>
          <div class="p-2 ">
            {" "}
            <Link to={`/profile/${user.username}`}>{user.username}</Link>
          </div>
        </div>
      </>
    );
  }
}

export default withAuth(nav);
