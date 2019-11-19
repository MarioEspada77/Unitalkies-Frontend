import React, { Component } from "react";
import Follow from "./Follow";
import { withAuth } from "../Context/AuthContext";
import followServices from "../services/followService";
import styled from "styled-components";

const UserCard = styled.div`
  background-color: ${({ theme }) => theme.boxColor};
  color: ${({ theme }) => theme.color};
  border: 1px solid ${({ theme }) => theme.borderColor};
  margin-left: 20px;
  margin-top: 140px;
  height: auto;
  width: 240px;
  padding: 10px;
  margin-right: 20px;
  word-break: break-all;
  border-radius: 4px;
`;
const Center = styled.div`
  text-align: center;
`;

class ListFollowing extends Component {
  state = {
    isFollowing: null,
    isOtherUser: null,
    following: {}
  };
  async componentDidMount() {
    const { username, user } = this.props;
    const isFollowing =
      username.follower === user._id && this.setState({ isFollowing: true });
    const following = await followServices.getFollowing(user.username);

    const ifFollwing = await following.find(element => {
      if (element.followed._id === username.followed._id) {
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
    try {
      const follow = await followServices.followUser(
        username.followed.username,
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
    const { username } = this.props;
    const { isFollowing } = this.state;

    return (
      <UserCard>
        <Center>
          <p>{username.followed.username}</p>
        </Center>
        <Center>
          <Follow
            isFollowing={isFollowing}
            getUnfollow={this.getUnfollow}
            getFollows={this.getFollows}
          ></Follow>
        </Center>
      </UserCard>
    );
  }
}

export default withAuth(ListFollowing);
