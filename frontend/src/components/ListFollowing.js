import React, { Component } from 'react';
import Follow from './Follow';
import { withAuth } from "../Context/AuthContext";
import followServices from "../services/followService";

class ListFollowing extends Component {
    state = {
        isFollowing: null,
    }
    componentDidMount(){
        const { username, user } = this.props;
        const isFollowing = username.follower === user._id && this.setState({isFollowing: true});
        console.log(isFollowing);
    }
    getUnfollow = async () => {
        const { user, username } = this.props;
        try {
          const unfollow = await followServices.deleteFollow(username._id);
          if (unfollow) {
            this.setState({
              isFollowing: false,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
    render() {
        const { username } = this.props;
        const { isFollowing } = this.state;
        console.log("username", username)
        return (
            <div>
                <p>{username.followed.username}</p>
                <Follow isFollowing={isFollowing} getUnfollow={this.getUnfollow}></Follow>
            </div>
        );
    }
}

export default withAuth(ListFollowing);