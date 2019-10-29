import React, { Component } from "react";
import profileServices from "../services/profileService";
import followServices from "../services/followService";
import { withAuth } from "../Context/AuthContext";
import Post from "./Post";
import Follow from "./Follow";

class UserProfile extends Component {
  state = {
    profile: [],
    posts: [],
    loading: true,
    error: undefined,
    follows: [],
    following: [],
    isFollowing: null
  };
  componentDidMount() {
    const { username } = this.props;
    profileServices
      .listUserProfile(username)
      .then(userProfile => {
        this.setState({
          profile: userProfile.user,
          posts: userProfile.posts,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: "El perfil que estás buscando no existe"
        });
      });
    followServices
      .getFollowersUser(username)
      .then(follows => {
        this.setState({
          follows
        });
      })
      .catch(error => {
        console.log(error);
      });

    followServices
      .getFollowing(username)
      .then(following => {
        this.setState({
          following
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  getFollows = async () => {
    const { follows } = this.state;
    const { username, user } = this.props;
    try {
      const follow = await followServices.followUser(username, user.username);
      console.log("FOLLOW", follow);
      if (follow) {
        this.setState({
          isFollowing: true,
          follows: [...follows, follow]
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  getUnfollow = async () => {
    const { user } = this.props;
    const { follows } = this.state;
    console.log("ESTADO SEGUIDOS", follows);
    const ifFollwings = follows.find(element => {
      if (element.follower._id === user._id) {
        return true;
      }
    });
    console.log(ifFollwings);
    console.log(user);
    try {
      const unfollow = await followServices.deleteFollow(ifFollwings._id);
      if (unfollow) {
        this.setState({
          isFollowing: false
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const {
      profile,
      posts,
      loading,
      error,
      follows,
      following,
      isFollowing
    } = this.state;
    return (
      <div>
        {!error && (
          <>
            {!loading && (
              <div>
                <p>username: {profile[0].username}</p>
                <Follow
                  isFollowing={isFollowing}
                  getFollows={this.getFollows}
                  getUnfollow={this.getUnfollow}
                ></Follow>
                <p>Siguiendo {following.length}</p>
                <p>Seguidores: {follows.length}</p>
                <div className="user-publications">
                  {posts.length === 0 && (
                    <p>
                      Este usuario todavía no ha escrito ninguna publicación
                    </p>
                  )}{" "}
                  <Post posts={posts}></Post>
                </div>
              </div>
            )}
            {loading && <div>Cargando perfil del usuario...</div>}
          </>
        )}
        <div>{error}</div>
      </div>
    );
  }
}

export default withAuth(UserProfile);
