import React, { Component } from "react";
import ListPosts from "./ListPosts";

class Post extends Component {
  render() {
    const { posts } = this.props;
    return (
      <>
        {posts.map(post => {
          return (
            <ListPosts key={`id-post-${post._id}`} post={post}></ListPosts>
          );
        })}
      </>
    );
  }
}

export default Post;
