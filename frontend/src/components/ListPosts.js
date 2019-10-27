import React, { Component } from 'react';
import postServices from '../services/postService';

class ListPosts extends Component {
    state = {
        likes: [],
    }
    componentDidMount(){
        const { post } = this.props;
        const { likes } = this.state;
        this.setState({
            likes: post.likes,
        })
    }
    makeLike = () =>{
        const { post } = this.props;
        const { likes } = this.state;
        postServices.createLike(post._id, post.username.username)
        .then((like) =>{
            console.log(like);
            this.setState({
                likes: [like, ...likes]
            })
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    render() {
        const { post } = this.props;
        const { likes } = this.state;
        console.log("POST" + post);
        return (
                <div key={`post-${post._id}`} className="post-row">
                    <p><i><b>{post.username.username}</b></i></p>
                    <p>{post.text}</p>
                    <p>Likes:<b>{likes.length}</b></p>
                    <button onClick={this.makeLike}>Like</button>
                </div> 
        );
    }
}

export default ListPosts;