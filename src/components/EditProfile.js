import React, { Component } from 'react';
import styled from "styled-components";
import { withAuth } from "../Context/AuthContext";

const EditWrapper = styled.div`
    width: 40%;
    margin: 0 auto;
    margin-top: 100px;
    text-align: center;
    padding: 10px;
    color:${({ theme }) => theme.color};
    border: 1px solid ${({ theme }) => theme.borderColor};
    background-color: ${({ theme }) => theme.boxColor};
`
const InputForm = styled.input`
    width: 100%;
    padding: 6px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 1px solid ${({ theme }) => theme.borderColor};
`
const LabelForm = styled.label`
`
const ButtonForm = styled.input`
    margin-top: 10px;
    display: inline-block;
    background-color: ${({ theme }) => theme.secondary}
    text-align: center;
    border: 1px solid ${({ theme }) => theme.secondary}
    border-radius: 0.25rem;
    margin-top: 10px;
    padding: 4px;
    width: 140px;
    margin-left: 10px;
`

class EditProfile extends Component {
    state = {
        university: "",
        description: "", 
    }
    handleChange = (event) => {  
        const {name, value} = event.target;
        this.setState({[name]: value});
      }
    
      handleFormSubmit = (e) => {
        e.preventDefault();
        const { university, description } = this.state;
        if(university === "" || description === ""){
          alert("Los campos no pueden estar vacíos");
        }else{
        }
      }
      
    render() {
        const { university, description } = this.state;
        const { username } = this.props.match.params;
        const { user } = this.props;
        return (
            <EditWrapper>
                    {username === user.username ? (
                        <form onSubmit={this.handleFormSubmit}>
                            <LabelForm>Universidad</LabelForm>
                            <InputForm type="text" placeholder="Universidad" name="university" value={university} onChange={this.handleChange}></InputForm>
                            <LabelForm>Descripción</LabelForm>
                            <InputForm type="text" placeholder="Descripción" name="description" value={description} onChange={this.handleChange}></InputForm>
                            <ButtonForm type="submit" value="Actualizar Datos"/>
                        </form>
                    ): <div>No puedes editar el perfil de otro usuario</div>}
            </EditWrapper>
        );
    }
}

export default withAuth(EditProfile);