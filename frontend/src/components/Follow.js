import React, { Component } from "react";
import followServices from "../services/followService";
import { withAuth } from "../Context/AuthContext";

class Follow extends Component {
  componentDidMount() {
    const { follows } = this.props;
    console.log("FOLLOWS" + follows);
  }
  followUser = async () => {
    const { username, user } = this.props;
    try {
      const follow = await followServices.followUser(username, user.username);
      if (follow) {
      }
    } catch (error) {
      console.log(error);
    }
  };
  UnfollowUser = async () => {};
  isFollowing = () => {
    const { follows, user } = this.props;
    const ifFollwing = follows.filter(element => {
      if (element.follower._id === user._id) {
        return true;
      }
      if (ifFollwing) {
        console.log("Siguiendo");
        return <button>Unfollow</button>;
      } else {
        return <button onClick={this.followUser}>Follow</button>;
      }
    });
    console.log(ifFollwing);
  };
  render() {
    return <div>{this.isFollowing()}</div>;
  }
}

export default withAuth(Follow);
