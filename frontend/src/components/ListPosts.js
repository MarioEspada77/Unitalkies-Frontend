import React, { Component } from 'react';

class ListPosts extends Component {
    render() {
        const { post, index} = this.props;
        return (
                <div key={`post-${index}`} className="post-row">
                    <p><i><b>{post.username}</b></i></p>
                    <p>{post.text}</p>
                    <p>Likes: <b>{post.likes.length}</b></p>
                </div> 
        );
    }
}

export default ListPosts;