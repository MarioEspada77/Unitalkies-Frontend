import React, { Component } from 'react';
import postServices from '../services/postService';

class ListPosts extends Component {
    render() {
        const { post } = this.props;
        return (
                <div key={`post-${post._id}`} className="post-row">
                    <p><i><b>{post.username}</b></i></p>
                    <p>{post.text}</p>
                    <p>Likes:{post.likes.length}</p>
                </div> 
        );
    }
}

export default ListPosts;