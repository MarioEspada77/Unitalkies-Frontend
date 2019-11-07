import React, { Component } from "react";
import profileServices from "../services/profileService";
import followServices from "../services/followService";
import { withAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import Post from "./Post";
import Follow from "./Follow";
import WritePost from "../components/WritePost";

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

    const userProfile = await profileServices
      .listUserProfile(username)
      .catch(error => {
        this.setState({
          error: "El perfil que estas buscando no existe o no esta disponible",
          loading: false
        });
      });
    console.log("PROFILES", userProfile);

    const follows = await followServices.getFollowersUser(username);

    const following = await followServices.getFollowing(username);
    console.log("follows", follows);
    const ifFollwing = await follows.find(element => {
      if (element.follower === user._id) {
        return true;
      }
    });
    console.log(ifFollwing);
    this.setState({
      profile: userProfile.userProfile,
      posts: userProfile.posts,
      loading: false,
      follows,
      following,
      isFollowing: ifFollwing
    });
  }
  getFollows = async () => {
    const { follows } = this.state;
    const { username, user } = this.props;
    try {
      const follow = await followServices.followUser(username, user.username);
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
    console.log("FOLLOWS: ", follows);
    const ifFollwing = await follows.find(element => {
      if (element.follower === user._id) {
        return true;
      }
    });
    try {
      console.log("UNFOLLOW", ifFollwing);
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
  updatePost = async post => {
    const { posts } = this.state;
    this.setState({
      posts: [post, ...posts]
    });
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
    const { user } = this.props;
    console.log("PROFILE", profile);
    return (
      <div>
        {!error && (
          <>
            {!loading && (
              <div>
                {profile[0].university_name ? (
                  <>
                    <p>University: {profile[0].university_name}</p>
                    <Follow
                      isFollowing={isFollowing}
                      getFollows={this.getFollows}
                      getUnfollow={this.getUnfollow}
                    ></Follow>
                    <p>Seguidores: {follows.length}</p>
                    <WritePost
                      user={user}
                      updatePost={this.updatePost}
                      university={profile[0]._id}
                    />
                  </>
                ) : (
                  <>
                    <p>username: {profile[0].username}</p>
                    {user._id !== profile[0]._id ? (
                      <Follow
                        isFollowing={isFollowing}
                        getFollows={this.getFollows}
                        getUnfollow={this.getUnfollow}
                      ></Follow>
                    ) : (
                      <button>Editar perfil</button>
                    )}
                    <p>
                      <Link to={`/following/${profile[0].username}`}>
                        Siguiendo: {following.length}
                      </Link>
                    </p>
                    <Link to={`/followers/${profile[0].username}`}>
                      Seguidores: {follows.length}
                    </Link>
                    <div className="user-publications">
                      {posts.length === 0 && (
                        <p>
                          Este usuario todavía no ha escrito ninguna publicación
                        </p>
                      )}{" "}
                      <Post posts={posts}></Post>
                    </div>
                  </>
                )}
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
