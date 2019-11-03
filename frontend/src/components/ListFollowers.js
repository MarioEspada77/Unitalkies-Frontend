import React, { Component } from 'react';
import { withAuth } from "../Context/AuthContext";
import followServices from "../services/followService";
import Follow from "./Follow";

class ListFollowers extends Component {
    state = {
        isFollowing: null,
        isOtherUser: null,
        ifFollwing: {}
      };
     async componentDidMount(){
        const { username, user } = this.props;
        const isFollowing = username.followed === user._id && this.setState({ isFollowing: true });
        const following = await followServices.getFollowing(user.username);
        console.log("following" , following)
        const ifFollwing = await following.find(element => {
            console.log("element", element.followed._id)
            console.log("USERNAME", username.follower._id)
            if (element.followed._id === username.follower._id) {
              return true;
            }
          });
        if (ifFollwing) {
            this.setState({
              isFollowing: true,
              isOtherUser: true,
              following: ifFollwing
            });
        }
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