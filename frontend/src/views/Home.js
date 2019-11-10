import React, { Component } from "react";
import { withAuth } from "../Context/AuthContext";
import postServices from "../services/postService";
import Post from "../components/Post";
import WritePost from "../components/WritePost";
import { Link } from "react-router-dom";
import NavPrimary from "../components/NavPrimary";
import "../css/home.scss";
import "../css/post.css";

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
            <div className="col-md-4 margin-home">
            <div className="user-card">
                 <div className="container">
                    <div className="information">
                        <img src="" alt="avatar" className="avatar" />
                        <div className="name">@{user.username}</div>
                        <div className="position">Universidad</div>
      
                      <div className="stats">
                          <span className="followers">
                              <span className="value">0</span>
                              <span className="label">Seguidores</span>
                         </span> 
        
                          <span className="following">
                              <span className="value">0</span>
                              <span className="label">Siguiendo</span>
                          </span>
        
                          <span className="stories">
                              <span className="value">0</span>
                              <span className="label">Post</span>
                         </span>
                      </div> 
                     </div> 
                   </div> 
            </div>
          </div>
            <div className="col-md-6 margin-home">
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
