import React, { Component } from 'react';
import { Link } from "react-router-dom";

class NotificationList extends Component {

   async componentDidMount(){
        const { notification } = this.props;
        
    }
    render() {
        const { notification } = this.props;
        return (
            <div>
            <p> <Link to={`/profile/${notification.notificationFrom.username}`}>{notification.notificationFrom.username}</Link> {notification.text}</p>
            </div>
        );
    }
}

export default NotificationList;