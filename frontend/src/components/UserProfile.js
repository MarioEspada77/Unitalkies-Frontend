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
  async componentDidMount() {
    const { username, user } = this.props;

    const userProfile = await profileServices.listUserProfile(username).catch((error) =>{ this.setState({error: "El perfil que estas buscando no existe", loading: false})})

    const follows = await followServices.getFollowersUser(username)

    const following = await followServices.getFollowing(username)

    const ifFollwing = await follows.find(element => {
      if (element.follower._id === user._id) {
        return true
      }
    });
      this.setState({
        profile: userProfile.userProfile,
        posts: userProfile.posts,
        loading: false,
        follows,
        following,
        isFollowing: ifFollwing,
      })
  


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
    const { user, username } = this.props;
    const { follows } = this.state;
    const ifFollwing =  await follows.find(element => {
      if (element.follower._id === user._id) {
        return true
      }
    });
    try {
      const unfollow = await followServices.deleteFollow(ifFollwing._id);
      const follows = await followServices.getFollowersUser(username);
      if (unfollow) {
        this.setState({
          isFollowing: false,
          follows
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
