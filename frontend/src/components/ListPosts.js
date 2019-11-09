import React, { Component } from "react";
import postServices from "../services/postService";
import { withAuth } from "../Context/AuthContext";

class ListPosts extends Component {
  state = {
    likes: []
  };
  componentDidMount() {
    const { post } = this.props;
    const { likes } = this.state;
    this.setState({
      likes: post.likes
    });
  }
  makeLike = async () => {
    const { post, user } = this.props;
    const { likes } = this.state;
    try {
      const like = await postServices.createLike(post._id, user.username);
      if (like) {
        this.setState({
          likes: [user._id, ...likes]
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  makeUnlike = async () => {
    const { post, user } = this.props;
    const { likes } = this.state;
    try {
      const unlike = await postServices.createUnlike(post._id, user.username);
      if (unlike) {
        const newLikes = likes.filter(element => {
          return user._id !== element;
        });
        this.setState({
          likes: newLikes
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  ifExistLike = () => {
    const { user } = this.props;
    const { likes } = this.state;
    let ifExistLikes = likes.indexOf(user._id);

    if (ifExistLikes > -1) {
      return (
        <>
          <i
            class="fa fa-heart"
            style={{ fontSize: "20px", color: "red" }}
            onClick={this.makeUnlike}
          ></i>
        </>
      );
    } else {
      return (
        <>
          <i
            class="fa fa-heart-o"
            style={{ fontSize: "20px", color: "red" }}
            onClick={this.makeLike}
          ></i>
        </>
      );
    }
  };

  render() {
    const { post, user } = this.props;
    const { likes } = this.state;
    return (
      <div key={`post-${post._id}`} className="shadow-sm p-3 mb-5 rounded">
        <p>
          <i>
            <b>
              {post.username.username}
              {post.formUni && <span>> {post.formUni.university_name}</span>}
            </b>
          </i>
        </p>
        <p>{post.text}</p>
        <div className="blockquote-footer">
          <p>{post.created_at}</p>
        </div>
        <p>
          Likes:<b>{likes.length}</b>
        </p>
        {this.ifExistLike()}
      </div>
    );
  }
}

export default withAuth(ListPosts);
