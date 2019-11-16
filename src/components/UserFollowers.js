import React, { Component } from "react";

import followServices from "../services/followService";
import ListFollowers from "./ListFollowers";
import styled from "styled-components";

const UserWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
`;

class UserFollowers extends Component {
  state = {
    followers: [],
    loading: true
  };
  async componentDidMount() {
    const { username } = this.props.match.params;
    const followers = await followServices.getFollowersUser(username);
    this.setState({
      followers,
      loading: false
    });
  }
  render() {
    const { followers, loading } = this.state;
    const { username } = this.props.match.params;
    console.log(followers);
    return (
      <UserWrapper>
        {!loading &&
          followers.map(user => {
            return (
              <ListFollowers
                userProfile={username}
                username={user}
                key={`username-${user._id}`}
              ></ListFollowers>
            );
          })}
        {followers.length === 0 && (
          <div>{username} no le sigue ningún usuario</div>
        )}
        {loading && <div>Cargando usuarios...</div>}
      </UserWrapper>
    );
  }
}

export default UserFollowers;
