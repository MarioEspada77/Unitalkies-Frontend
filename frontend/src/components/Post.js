import React, { Component } from 'react';

class Post extends Component {
    render() {
        const { posts } = this.props;
        return (
            <div className="post">  
                {
                    posts.map((post, index) =>{
                        return(
                            <div key={`post-${index}`} className="post-row">
                                <p><i><b>{post.username}</b></i></p>
                                <p>{post.text}</p>
                                <p>Likes: <b>{post.likes.length}</b></p>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default Post;