import React, { Component } from 'react';
import { withAuth } from "../Context/AuthContext";
import Follow from "./Follow";

class ListFollowers extends Component {
    state = {
        isFollowing: null,
        isOtherUser: null,
        following: {}
      };
     async componentDidMount(){
        const { username, user } = this.props;
        const isFollowing = username.follower === user._id && this.setState({ isFollowing: true });
      }
    render() {
        const { isFollowing } = this.state;
        const { username } = this.props;
        console.log(isFollowing);
        
        return (
            <div>
                <p>{username.follower.username}</p>
                <Follow
                    isFollowing={isFollowing}
                    getUnfollow={this.getUnfollow}
                    getFollows={this.getFollows}
                ></Follow>
            </div>
        );
    }
}

export default withAuth(ListFollowers);