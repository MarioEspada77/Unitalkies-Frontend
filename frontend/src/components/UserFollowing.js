import React, { Component } from 'react';

import followServices from "../services/followService";
import ListFollowing from './ListFollowing';

class UserFollowing extends Component {
    state = {
        following: [],
    }
    async componentDidMount(){
        const { username } = this.props.match.params;
        const following = await followServices.getFollowing(username)
        this.setState({
            following
        })
    }
    render() {
        const { following } = this.state;
        console.log("ESTADO" ,this.state.following)
        return (
            <div>
                {
                    following.map((user) =>{
                        return ( <ListFollowing username={user} key={`username-${user._id}`}></ListFollowing> )
                    })
                }
            </div>
        );
    }
}

export default UserFollowing;