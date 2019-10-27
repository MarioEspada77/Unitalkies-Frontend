import React, { Component } from 'react';
import postServices from '../services/postService';
import {withAuth} from '../Context/AuthContext';

class ListPosts extends Component {
    state = {
        likes: [],
    }
    componentDidMount(){
        const { post} = this.props;
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
    ifExistLike = () =>{
        const { user } = this.props;
        const  { likes } = this.state;
        const ifExistLikes = likes.filter(element =>{
            if(user._id === element){
                return true;
            }
        })

        if(ifExistLikes){
            return (<button>Ya no me gusta</button>)
        }else{
            return (<button onClick={this.makeLike}>Me gusta</button>)
        }
    }

    render() {
        const { post } = this.props;
        const { likes } = this.state;
        return (
                <div key={`post-${post._id}`} className="post-row">
                    <p><i><b>{post.username.username}</b></i></p>
                    <p>{post.text}</p>
                    <p>Likes:<b>{likes.length}</b></p>
                    {this.ifExistLike()}
                </div> 
        );
    }
}

export default  withAuth(ListPosts);