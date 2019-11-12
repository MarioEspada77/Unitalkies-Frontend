import React, { Component } from 'react';
import notifificationServices from "../services/notificationService";
import NotificationList from './NotificationList';

class Notifications extends Component {
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
        const { notifications } = this.state;
        console.log(notifications);
        return (
            <div>
                {notifications.map((notification) =>{
                    return <NotificationList notification={notification} key={`notification-${notification._id}`}/>
                })}
            </div>
        );
    }
}

export default Notifications;