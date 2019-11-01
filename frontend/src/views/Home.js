import React, { Component } from "react";
import { withAuth } from "../Context/AuthContext";
import postServices from "../services/postService";
import Post from "../components/Post";
import WritePost from "../components/WritePost";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    posts: [],
    loading: true,
    error: undefined
  };
  async componentDidMount() {
    postServices
      .listAllPost()
      .then(posts => {
        this.setState({
          posts,
          loading: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          error: "No ha sido posible cargar las publicaciones"
        });
      });
  }
  updatePost = post => {
    const { posts } = this.state;
    this.setState({
      posts: [ ...posts, post]
    });
  };
  statusPosts = () => {
    const { posts } = this.state;
    const { user } = this.props;
    if (posts.length === 0) {
      return  (
          <>
            <WritePost user={user} updatePost={this.updatePost} />
            <div>No hay ninguna publicación que mostrar</div>
          </>
      )
    
    } else {
      console.log(posts)
      return (
        <>
          <WritePost user={user} updatePost={this.updatePost} />
          <Post posts={posts}></Post>
        </>
      );
    }
  };

  render() {
    const { posts, loading, error } = this.state;
    const { user } = this.props;
    return (
      <div>
        {!error && (
          <>
            <Link to={`/profile/${user.username}`}>Ver perfil</Link>
            {!loading && this.statusPosts()}
            {loading && <div>Cargando publicaciones...</div>}
          </>
        )}
        <div>{error}</div>
      </div>
    );
  }
}

export default withAuth(Home);
