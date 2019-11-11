import React, { Component } from "react";
import { withAuth } from "../Context/AuthContext";
import postServices from "../services/postService";
import Post from "../components/Post";
import WritePost from "../components/WritePost";
import { Link } from "react-router-dom";
import NavPrimary from "../components/NavPrimary";
import "../css/home.scss";
import "../css/post.css";
import image from "../img/image_profile.jpg";

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
          error: "En estos mementos no ha sido posible cargar las publicaciones"
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
           <div className="shadow-sm p-3 mb-5 rounded card-color"><WritePost user={user} updatePost={this.updatePost} /></div>
           <div className="shadow-sm p-3 mb-5 rounded card-color">No hay ninguna publicación que mostrar</div>
        </>
      );
    } else {
      console.log(posts);
      return (
        <>
          <div className="shadow-sm p-3 mb-5 rounded card-color"><WritePost user={user} updatePost={this.updatePost} /></div>
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
          <div className="row">
            <div className="col-md-4 ">
            <div className="user-card margin-home">
                 <div className="container">
                    <div className="information">
                        <img src={image} alt="avatar" className="avatar rounded-circle" width="100" />
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
              {loading && <div className="loading"><div className="spinner-border loading"></div></div>}
              {!error ? (
                !loading && this.statusPosts()
              ) : (
                <div className ="shadow-sm p-3 mb-5 rounded card-color">
                  <p>{error}</p>
                </div>
              )} 
            </div>
          </div>
      </div>
    );
  }
}

export default withAuth(Home);
