import React, { Component } from 'react';
import profileServices from '../services/profileService';
import Post from './Post';

class UserProfile extends Component {
    state = {
        profile: [],
        posts: [],
        loading: true,
        error: undefined,
    }
    componentDidMount(){
        const { username } = this.props;
        profileServices.listUserProfile(username)
        .then((userProfile) =>{
            console.log(userProfile)
            this.setState({
                profile: userProfile.user,
                posts: userProfile.posts,
                loading: false,
            })
           
        })
        .catch((error) =>{
            this.setState({
                loading: false,
                error: "El perfil que estás buscando no existe",
            })
        })
    }
    render() {
        const { profile, posts, loading, error } = this.state;
        console.log(this.state.posts)
        return (
            <div>
                {!error &&  
                    <>
                     <Post posts={posts}></Post> 
                        {!loading && <div>
                            <p>username: {profile[0].username}</p>
                            <div className="user-publications">
                                {posts.length === 0  && <p>Este usuario todavía no ha escrito ninguna publicación</p>} 
                            </div>
                        </div>}  
                        {loading && <div>Cargando perfil del usuario...</div>} 
                    </>             
                }<div>{error}</div>
            </div>
        );
    }
}

export default UserProfile;