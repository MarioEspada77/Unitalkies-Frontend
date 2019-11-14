import React, { Component } from "react";
import postServices from "../services/postService";
import "../css/home.scss";

class WritePost extends Component {
  state = {
    text: "",
    disabled: true
  };
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  addPost = e => {
    e.preventDefault();
    const { user, updatePost, university } = this.props;
    const { text, caracters } = this.state;
    const username = user.username;
    postServices
      .createPost(username, text, university)
      .then(post => {
        updatePost(post.post);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { addPost } = this.props;
    const { text, disabled } = this.state;
    return (
      <div>
        <form onSubmit={this.addPost}>
          <div className="input-group-append">
            <textarea
              className="md-textarea form-control"
              type="text"
              name="text"
              placeholder="En que estás pensando?"
              value={text}
              onChange={this.handleInput}
            ></textarea>
          </div>
          <div className="text-right button-page">
            <button className="button-WritePost disabled">Publicar</button>
          </div>
        </form>
      </div>
    );
  }
}

export default WritePost;
