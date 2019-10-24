import React, { Component } from 'react';
import {withAuth} from '../Context/AuthContext';

class Home extends Component {
    render() {
        const { user } = this.props;
        return (
            <div>
                <p>{user.username}</p>
            </div>
        );
    }
}

export default  withAuth(Home);