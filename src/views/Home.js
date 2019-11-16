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
import styled from "styled-components";

const BackgroundWritePost = styled.div`
  background-color: ${({ theme }) => theme.boxColor};
`;
const Container = styled.div`
  margin-top: 40px;
  width: 100%;
  background: ${({ theme }) => theme.boxColor};
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

class Home extends Component {
  state = {
    posts: [],
    userPosts: [],
    loading: true,
    error: undefined
  };
  async componentDidMount() {
    const { user } = this.props;
    postServices
      .listAllPost()
      .then(posts => {
        const userPosts = posts.filter(elem => elem.username._id === user._id);
        this.setState({
          posts,
          userPosts,
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
          <div className="shadow-sm p-3 mb-5 rounded card-color">
            <WritePost user={user} updatePost={this.updatePost} />
          </div>
          <div className="shadow-sm p-3 mb-5 rounded card-color">
            No hay ninguna publicación que mostrar
          </div>
        </>
      );
    } else {
      console.log(posts);
      return (
        <>
          <BackgroundWritePost>
            <div className="shadow-sm p-3 mb-5 rounded">
              <WritePost user={user} updatePost={this.updatePost} />
            </div>
          </BackgroundWritePost>
          <Post posts={posts}></Post>
        </>
      );
    }
  };

  render() {
    const { posts, loading, error, userPosts } = this.state;
    const { user } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 ">
            <div className="user-card margin-home">
              <Container>
                <div className="information">
                  <img
                    src={image}
                    alt="avatar"
                    className="avatar rounded-circle"
                    width="100"
                  />
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
                      <span className="value">{userPosts.length}</span>
                      <span className="label">Post</span>
                    </span>
                  </div>
                </div>
              </Container>
            </div>
          </div>
          <div className="col-md-6 margin-home">
            {loading && (
              <div className="loading">
                <div className="spinner-border loading"></div>
              </div>
            )}
            {!error ? (
              !loading && this.statusPosts()
            ) : (
              <div className="shadow-sm p-3 mb-5 rounded card-color">
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
