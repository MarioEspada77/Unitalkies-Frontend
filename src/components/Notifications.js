import React, { Component } from 'react';
import notifificationServices from "../services/notificationService";
import NotificationList from './NotificationList';
import styled from "styled-components";

const Container = styled.div`
  margin-top: 40px;
`;

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
            <Container>
                {notifications.map((notification) =>{
                    return <NotificationList notification={notification} key={`notification-${notification._id}`}/>
                })}
            </Container>
        );
    }
}

export default Notifications;