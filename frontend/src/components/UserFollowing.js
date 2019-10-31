import React, { Component } from 'react';

import followServices from "../services/followService";
import ListFollowing from './ListFollowing';

class UserFollowing extends Component {
    state = {
        following: [],
        loading: true,
    }
    async componentDidMount(){
        const { username } =  this.props.match.params;
        const following = await followServices.getFollowing(username)
        this.setState({
            following,
            loading: false,

        })
    }
    render() {
        const { following, loading } = this.state;
        const { username } = this.props.match.params;

        return (
            <div>
                {following.length === 0 && <div>{username} todavía no sigue a ningún usuario</div>}
                {!loading && 
                        following.map((user) =>{
                            return ( <ListFollowing userProfile={username} username={user} key={`username-${user._id}`}></ListFollowing> )
                         })
                }
                {loading && <div>Cargando usuarios...</div>}

            </div>
        );
    }
}

export default UserFollowing;