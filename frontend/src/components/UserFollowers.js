import React, { Component } from 'react';

import followServices from "../services/followService";
import ListFollowers from "./ListFollowers";

class UserFollowers extends Component {
    state = {
        followers: [],
        loading: true,
    }
    async componentDidMount(){
        const { username } =  this.props.match.params;
        const followers = await followServices.getFollowersUser(username)
        this.setState({
            followers,
            loading: false,

        })
    }
    render() {
        const { followers, loading } = this.state;
        const { username } = this.props.match.params;
        console.log(followers)
        return (
            <div>
                {!loading && 
                        followers.map((user) =>{
                            return ( <ListFollowers userProfile={username} username={user} key={`username-${user._id}`}></ListFollowers> )
                         })
                         
                }
                {followers.length === 0 && <div>{username} todavía no sigue a ningún usuario</div>}
                {loading && <div>Cargando usuarios...</div>}

            </div>
        );
    }
}

export default UserFollowers;