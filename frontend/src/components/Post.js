import React, { Component } from 'react';
import ListPosts from './ListPosts';

class Post extends Component {
    render() {
        const { posts } = this.props;
        console.log(posts);
        return (
            <div className="post">  
                {
                    posts.map((post) =>{
                        return(
                            <ListPosts post={post}></ListPosts>
                        )
                    })
                }
            </div>
        );
    }
}

export default Post;