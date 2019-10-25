import React, { Component } from 'react';

class WritePost extends Component {
    state = {
        text: '',
    }
     handleInput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    render() {
        const { addPost } = this.props;
        const { text } = this.state;
        return (
            <div>
                <form onSubmit={() => {addPost(text)}}>
                    <input type="text" name="text" placeholder="En que estás pensando?" value={text} onChange={this.handleInput}></input>
                    <button>Publicar</button>
                </form>
            </div>
        );
    }
}

export default WritePost;