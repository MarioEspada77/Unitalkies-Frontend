import React, { Component } from "react";
import profileServices from "../services/profileService";
import followServices from "../services/followService";
import Post from "./Post";
import Follow from "./Follow";

class UserProfile extends Component {
  state = {
    profile: [],
    posts: [],
    loading: true,
    error: undefined,
    follows: [],
    following: []
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
  render() {
    const { profile, posts, loading, error, follows, following } = this.state;
    const { username } = this.props;
    return (
      <div>
        {!error && (
          <>
            {!loading && (
              <div>
                <p>username: {profile[0].username}</p>
                <Follow username={username} follows={follows}></Follow>
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

export default UserProfile;
