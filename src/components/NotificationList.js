import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'moment-timezone';
import styled from "styled-components";

const UserNotification = styled.div`
  width: 800px;
  background-color: ${({ theme }) => theme.boxColor};
  color: ${({ theme }) => theme.color};
  padding: 20px;
  border-top: 6px solid ${({ theme }) => theme.secondary};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.borderColor}
  margin-top: 40px;
  margin-left: 30%;
`;

class NotificationList extends Component {

   async componentDidMount(){
        const { notification } = this.props;
        
    }
    render() {
        const { notification } = this.props;
        const DateToFormat = notification.created_at
        return (
            <UserNotification>
                <p> <Link to={`/profile/${notification.notificationFrom.username}`}>{notification.notificationFrom.username}</Link> {notification.text} · <Moment fromNow>{DateToFormat}</Moment></p>
            </UserNotification>
        );
    }
}

export default NotificationList;