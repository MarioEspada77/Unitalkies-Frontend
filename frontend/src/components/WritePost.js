import React, { Component } from 'react';
import postServices from '../services/postService';

class WritePost extends Component {
    state = {
        text: '',
    }
     handleInput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    addPost = (e) =>{
        e.preventDefault();
        const { user, updatePost } = this.props;
        const { text } = this.state;
        const username = user.username;
        postServices.createPost(username, text)
        .then((post) =>{
            updatePost(post.post)
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    render() {
        const { addPost } = this.props;
        const { text } = this.state;
        return (
            <div>
                <form onSubmit={this.addPost}>
                    <input type="text" name="text" placeholder="En que estás pensando?" value={text} onChange={this.handleInput}></input>
                    <button>Publicar</button>
                </form>
            </div>
        );
    }
}

export default WritePost;