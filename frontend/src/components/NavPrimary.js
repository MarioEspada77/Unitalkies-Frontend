import React, { Component } from 'react';
import { withAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import "../css/nav.css";

class nav extends Component {
    render() {
        const { user } = this.props;
        return (
            <div>
                <div className="sticky-top primary-color padding-nav">
                    <div className="username-profile">
                    <Link to={`/profile/${user.username}`}>{user.username}</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withAuth(nav);