import React, { Component } from "react";
import { withAuth } from "../Context/AuthContext";
import postServices from "../services/postService";
import Post from "../components/Post";
import WritePost from "../components/WritePost";
import { Link } from "react-router-dom";
import NavPrimary from "../components/NavPrimary";
import "../css/home.css";

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
      posts: [post, ...posts]
    });
  };
  statusPosts = () => {
    const { posts } = this.state;
    const { user } = this.props;
    if (posts.length === 0) {
      return (
        <>
          <WritePost user={user} updatePost={this.updatePost} />
          <div>No hay ninguna publicación que mostrar</div>
        </>
      );
    } else {
      console.log(posts);
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
      <div className="container-fluid">
        <NavPrimary />
        {!error && (
          <div className="row">
            <div className="col-md-2 shadow-sm p-3 mb-5 rounded margin-home">
              <p>user profile card</p>
            </div>
            <div className="col-md-8 margin-home">
              {!loading && this.statusPosts()}
            </div>
            {loading && <div>Cargando publicaciones...</div>}
          </div>
        )}
        <div>{error}</div>
      </div>
    );
  }
}

export default withAuth(Home);
