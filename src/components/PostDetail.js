import React, { Component } from "react";
import postServices from "../services/postService";
import styled from "styled-components";
import Moment from "react-moment";
import "moment-timezone";
import { Link } from "react-router-dom";
import AuthProvider, { withAuth } from "../Context/AuthContext";
import WritePost from "./WritePost";
import PostComment from "./PostComment";

const HeartWrap = styled.span`
  i {
    color: red;
    font-size: 20px;
  }
`;
const PostWrapper = styled.div`
  margin: 0 auto;
`;

const Posts = styled.div`
  margin-top: 140px;
  background-color: ${({ theme }) => theme.boxColor};
  color: ${({ theme }) => theme.color};
  margin-left: 20px;
  margin-right: 20px;
  width: 60%;
`;

class PostDetail extends Component {
  state = {
    post: [],
    error: "",
    likes: [],
    comments: [],
  };

  async componentDidMount() {
    const { postId } = this.props.match.params;
    const posts = await postServices.postDetail(postId).catch(error => {
    });
    this.setState({
      post: posts.postDetail,
      likes: posts.postDetail.likes,
      comments:  posts.postComments
    });
  }
  makeLike = async () => {
    const { user } = this.props;
    const { likes, post } = this.state;
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
    const { user } = this.props;
    const { likes, post } = this.state;
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
    const { likes, post } = this.state;
    let ifExistLikes = likes.indexOf(user._id);

    if (ifExistLikes > -1) {
      return (
        <HeartWrap>
          <i className="fa fa-heart " onClick={this.makeUnlike}></i>
        </HeartWrap>
      );
    } else {
      return (
        <>
          <HeartWrap>
            <i className="fa fa-heart-o" onClick={this.makeLike}></i>
          </HeartWrap>
        </>
      );
    }
  };
  updatePost = async comment => {
    const { comments } = this.state;
    this.setState({
      comments: [comment, ...comments]
    });
  };
  render() {
    const { post, likes, comments } = this.state;
    const { user } = this.props;
    const DateToFormat = post.created_at;
    return (
      <PostWrapper>
        <Posts>
          {post.length !== 0 && (
            <div
              key={`post-${post._id}`}
              className="shadow-sm p-3 mb-5 card-color"
            >
              <Link to={`/detail/${post._id}`}>
                <p>
                  <i>
                    {post.username.username} ·
                    <Moment fromNow>{DateToFormat}</Moment>
                    {post.formUni && (
                      <span>
                        en la universidad {post.formUni.university_name}
                      </span>
                    )}
                    {post.commented_to && (
                      <span>
                          <Link to={`/detail/${post.commented_to}`}> comentado en la publicación de {post.username.username}</Link>
                      </span>
                    )}
                  </i>
                </p>
                <p>{post.text}</p>
                <div className="blockquote-footer">
                  <p>
                    <Moment parse="YYYY-MM-DD">{DateToFormat}</Moment>
                  </p>
                </div>
                <p>
                  Likes:<b>{likes.length}</b>
                </p>
                {this.ifExistLike()}
              </Link>
              <WritePost post={post} user={user} updatePost={this.updatePost} ></WritePost>
            </div>
          )}
        </Posts>
          {comments.map((comment) =>{
            return (
              <PostComment comment={comment}></PostComment>
            )
          })}
      </PostWrapper>
    );
  }
}

export default withAuth(PostDetail);
