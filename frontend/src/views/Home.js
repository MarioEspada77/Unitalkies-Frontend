import React, { Component } from 'react';
import {withAuth} from '../Context/AuthContext';
import postServices from '../services/postService';
import Post from '../components/Post';

class Home extends Component {
    state = {
        posts: [],
        loading: true,
        error: undefined,
    }
   async componentDidMount(){  
       postServices.listAllPost()
       .then((posts) =>{
           this.setState({
               posts,
               loading: false,
           })
       })
       .catch((error) =>{
           console.log(error);
       })
    }
    statusPosts = () =>{
        const { posts } = this.state;
        if(posts.length === 0 ){
            return ( <div>No hay ninguna publicación que mostrar</div>)
        }else{
            return (
                <Post posts={posts}></Post>
            );
        }
    }
    render() {
        const { posts, loading, error } = this.state;
        console.log(posts);
        return (
            <div>
                {!loading && this.statusPosts()}  
                {loading && <div>Loading...</div>}
            </div>
        );
    }
}

export default  withAuth(Home);