import React, { Component } from 'react';
import UserProfile from '../components/UserProfile';

class UserProfileView extends Component {
    render() {
        const { username } = this.props.match.params;
        return (
            <div>
                <UserProfile username={username}></UserProfile>
            </div>
        );
    }
}

export default UserProfileView;