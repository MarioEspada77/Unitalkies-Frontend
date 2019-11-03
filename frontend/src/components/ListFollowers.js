import React, { Component } from 'react';
import { withAuth } from "../Context/AuthContext";
import followServices from "../services/followService";

class ListFollowers extends Component {
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default withAuth(ListFollowers);