import React, { Component } from "react";
import { withAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import "../css/nav.css";

class nav extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <div className="navbar fixed-top primary-color padding-nav">
          <div className="username-profile">
            <div className="d-flex flex-row-reverse">
              <div className="p-2">
                <Link to={`/profile/${user.username}`}>{user.username}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(nav);
