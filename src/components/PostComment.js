import React, { Component } from 'react';
import styled from "styled-components";
import Moment from "react-moment";
import "moment-timezone";
import postServices from "../services/postService";
import { withAuth } from "../Context/AuthContext";

const HeartWrap = styled.span`
  i {
    color: red;
    font-size: 20px;
  }
`;
const Comments = styled.div`
  margin-top: 40px;
  background-color: ${({ theme }) => theme.boxColor};
  color: ${({ theme }) => theme.color};
  margin-left: 100px;
  margin-right: 20px;
  width: 60%;
`
class PostComment extends Component {
    state = {
        likes: [],
    }
    componentDidMount(){
        const { comment } = this.props;
        this.setState({
            likes: comment.likes
        })
    }
    makeLike = async () => {
        const { user, comment } = this.props;
        const { likes } = this.state;
        try {
          const like = await postServices.createLike(comment._id, user.username);
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
        const { user, comment } = this.props;
        const { likes } = this.state;
        try {
          const unlike = await postServices.createUnlike(comment._id, user.username);
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
    render() {
        const { comment } = this.props;
        const { likes } = this.state;
        const DateToFormat = comment.created_at;
        console.log("comment" , comment)
        return (
            <div>
                <Comments>
                  <div key={`post-${comment._id}`} className="shadow-sm p-3 mb-5 card-color">
                  <p>
                  <i>
                    {comment.username.username} ·
                    <Moment fromNow>{DateToFormat}</Moment>
                    {comment.formUni && (
                      <span>
                        en la universidad {comment.formUni.university_name}
                      </span>
                    )}
                  </i>
                </p>
                <p>{comment.text}</p>
                <div className="blockquote-footer">
                  <p>
                    <Moment parse="YYYY-MM-DD">{DateToFormat}</Moment>
                  </p>
                </div>
                <p>
                  Likes:<b>{likes.length}</b>
                </p>
                {this.ifExistLike()}
                  </div>
              </Comments>
            </div>
        );
    }
}

export default withAuth(PostComment);