import React, { Component } from "react";
import ListPosts from "./ListPosts";

class Post extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div className="post">
        {posts.map(post => {
          return (
            <ListPosts key={`id-post-${post._id}`} post={post}></ListPosts>
          );
        })}
      </div>
    );
  }
}

export default Post;
