import React, { Component } from "react";
import styled from "styled-components";

const NotFound = styled.div`
  width: 40%;
  margin: 0 auto;
  margin-top: 100px;
  text-align: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.boxColor};
  width: 40%;
  border: 1px solid ${({ theme }) => theme.borderColor};
  color: ${({ theme }) => theme.color};
`;

class NoPage extends Component {
  render() {
    return (
      <div>
        <NotFound>
          <h1>UPS!</h1>
          <p>Página no encontarda.</p>
        </NotFound>
      </div>
    );
  }
}

export default NoPage;
