import React, { Component } from 'react';
import ListPosts from './ListPosts';

class Post extends Component {
    render() {
        const { posts } = this.props;
        return (
            <div className="post">  
                {
                    posts.map((post, index) =>{
                        return(
                            <ListPosts post={post} index={index}></ListPosts>
                        )
                    })
                }
            </div>
        );
    }
}

export default Post;