import React, { Component } from 'react';
import { withAuth } from "../Context/AuthContext";
import "../css/nav.css";

class nav extends Component {
    render() {
        return (
            <div>
                <div className="sticky-top primary-color padding-nav">Sticky top</div>
            </div>
        );
    }
}

export default withAuth(nav);