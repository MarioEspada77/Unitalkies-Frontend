import React, { Component } from "react";
import postServices from "../services/postService";
import "../css/home.scss";
import styled from "styled-components";

const ButtonWritePost = styled.button`
  margin-top: 10px;
  display: inline-block;
  background-color: ${({ theme }) => theme.secondary}
  text-align: center;
  border: 1px solid ${({ theme }) => theme.primary}
  border-radius: 0.25rem;
  cursor: ${( props ) =>  props.disabled ? "not-allowed" : "pointer" } 
  margin-top: 10px;
  padding: 4px;
  width: 120px;
`;

class WritePost extends Component {
  state = {
    text: "",
    disabled: true,
  };
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  addPost = e => {
    e.preventDefault();
    const { user, updatePost, university, post_id } = this.props;
    const { text, caracters } = this.state;
    const username = user.username;
    postServices
      .createPost(username, text, university, post_id )
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
          <div className="text-right">
            {text.length > 0 ? <ButtonWritePost>Publicar</ButtonWritePost> : <ButtonWritePost disabled={true}>Publicar</ButtonWritePost> }
          </div>
        </form>
      </div>
    );
  }
}

export default WritePost;
