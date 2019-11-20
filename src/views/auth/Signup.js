import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';
import styled from "styled-components";

const LoginForm = styled.div`
  width: 40%;
  margin: 0 auto;
  margin-top: 100px;
  text-align: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.boxColor};
`
const InputLogin = styled.input`
  margin-top: 10px;
  display: inline-block;
  background-color: ${({ theme }) => theme.secondary}
  text-align: center;
  border: 1px solid ${({ theme }) => theme.secondary}
  border-radius: 0.25rem;
  margin-top: 10px;
  padding: 4px;
  width: 120px;
  margin-left: 10px;
`;

class Signup extends Component {

  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.handleSignup({
      username,
      password
    })
  }
  render() {
    const { username, password } = this.state;
    return (
      <div>
        <LoginForm onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange}/>
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <InputLogin type="submit" value="Signup" />
        </LoginForm>

        <p>Already have account? 
          <Link to={"/login"}> Login</Link>
        </p>

      </div>
    )
  }
}

export default withAuth(Signup);