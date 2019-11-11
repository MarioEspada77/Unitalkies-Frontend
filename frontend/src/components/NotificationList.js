import React, { Component } from 'react';

class NotificationList extends Component {

   async componentDidMount(){
        const { notification } = this.props;
        
    }
    render() {
        const { notification } = this.props;
        return (
            <div>
            <p>{notification.notificationFrom.username} {notification.text}</p>
            </div>
        );
    }
}

export default NotificationList;