import React, { Component } from 'react';
import {withAuth} from '../Context/AuthContext';
import postServices from '../services/postService';
import Post from '../components/Post';
import WritePost from '../components/WritePost';

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
           this.setState({
               loading: false,
               error: "No ha sido posible cargar las publicaciones"
           })
       })
    }
    addPost = (text) =>{
        const {user} = this.props;
        postServices.createPost(user.username)
        .then((post) =>{
            console.log("Escrito correctamente");
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
                <>
                    <WritePost addPost={this.addPost} />
                    <Post posts={posts}></Post>
                </>
            );
        }
    }
  
    render() {
        const { posts, loading, error } = this.state;
        return (
            <div>
                {!error &&  
                    <>
                        {!loading && this.statusPosts()}  
                        {loading && <div>Cargando publicaciones...</div>} 
                    </>             
                }<div>{error}</div>
  
            </div>
        );
    }
}

export default  withAuth(Home);