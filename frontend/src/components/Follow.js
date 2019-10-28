import React, { Component } from "react";
import followServices from "../services/followService";
import { withAuth } from "../Context/AuthContext";
import { tsUndefinedKeyword } from "@babel/types";

class Follow extends Component {
  state = {
    deleteFollow: undefined,
  }
  componentDidMount() {
    const { follows } = this.props;

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
  unfollowUser = async () =>{
    const { follows, user } = this.props;
    const  ifFollwings = follows.find(element => {
      if (element.follower._id === user._id) {
        return true;
      }
    });
    try {
      console.log(ifFollwings)
      const unfollow = await followServices.deleteFollow(ifFollwings._id)
      if(unfollow){
        console.log("Unfollow OK");
      }
    } catch (error) {
      console.log(error);
    }
  }
  isFollowing = () => {
    const { follows, user } = this.props;
    const  ifFollwing = follows.find(element => {
      if (element.follower._id === user._id) {
        return true;
      }
    });
    if (ifFollwing) {
      return <button onClick={this.unfollowUser}>Unfollow</button>
  
  
    } else {
      return <button onClick={this.followUser}>Follow</button>;
    }
  };
  render() {
    return <div>{this.isFollowing()}</div>
  }
}

export default withAuth(Follow);
