import React, { Component } from 'react';
import Follow from './Follow';

class ListFollowing extends Component {
    render() {
        const { username } = this.props;
        console.log("username", username)
        return (
            <div>
                <p>{username.followed.username}</p>
                <Follow></Follow>
            </div>
        );
    }
}

export default ListFollowing;