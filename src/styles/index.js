import { createGlobalStyle } from "styled-components";

export const theme = {
  light: {
    theme: "light",
    primary: "#FF8360",
    secondary: "#FF8360",
    boxColor: "white",
    color: "black",
    borderColor: "#d9d9d9",
    body: "#f0f0f0"
  },
  dark: {
    theme: "dark",
    primary: "#333",
    secondary: "#ffa420",
    boxColor: "#333",
    color: "white",
    borderColor: "#d9d9d9",
    body: "#242e32"
  }
};

export const GlobalStyle = createGlobalStyle`
  html {
    body {
      background-color: ${({ theme }) => theme.body} ;
      a {
        color: ${({ theme }) => theme.color}
      }
      a:hover{
        text-decoration: none;
      }
    }
  }
`;
