import React, { Component } from 'react';
import postServices from '../services/postService';

class ListPosts extends Component {
    render() {
        const { post } = this.props;
        console.log("POST" + post);
        return (
                <div key={`post-${post._id}`} className="post-row">
                    <p>{post.username.username}</p>
                    <p>{post.text}</p>
                    <p>Likes:{post.likes.length}</p>
                </div> 
        );
    }
}

export default ListPosts;