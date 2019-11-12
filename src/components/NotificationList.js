import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';

class NotificationList extends Component {

   async componentDidMount(){
        const { notification } = this.props;
        
    }
    render() {
        const { notification } = this.props;
        const DateToFormat = notification.created_at
        return (
            <div>
                <p> <Link to={`/profile/${notification.notificationFrom.username}`}>{notification.notificationFrom.username}</Link> {notification.text} · <Moment fromNow>{DateToFormat}</Moment></p>
            </div>
        );
    }
}

export default NotificationList;