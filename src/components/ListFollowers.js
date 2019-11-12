import React, { Component } from "react";
import { withAuth } from "../Context/AuthContext";
import followServices from "../services/followService";
import Follow from "./Follow";

class ListFollowers extends Component {
  state = {
    isFollowing: null,
    isOtherUser: null,
    ifFollwing: {}
  };
  async componentDidMount() {
    const { username, user } = this.props;
    const isFollowing =
      username.followed._id === user._id &&
      this.setState({ isFollowing: true });
    const following = await followServices.getFollowing(user.username);
    const ifFollwing = await following.find(element => {
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
  getFollows = async () => {
    const { username, user } = this.props;
    console.log(username);
    try {
      const follow = await followServices.followUser(
        username.follower.username,
        user.username
      );
      if (follow) {
        this.setState({
          isFollowing: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  getUnfollow = async () => {
    const { user, username } = this.props;
    const { isOtherUser, following } = this.state;
    try {
      if (isOtherUser) {
        const unfollow = await followServices.deleteFollow(following._id);
        this.setState({
          isFollowing: false
        });
      } else {
        console.log("USUARIO", username);
        const unfollow = await followServices.deleteFollow(username._id);
        this.setState({
          isFollowing: false
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { isFollowing } = this.state;
    const { username } = this.props;

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
