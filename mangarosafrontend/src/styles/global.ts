import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    background: #f8f8f8;
    color: #414141;
  }

  body, input, button, label, textarea {
      font: 400 16px 'Roboto', sans-serif;
  }

  @media (max-width: 1080px){
    html{
        font-size: 93.75%; 
    }
  }
  
  @media (max-width:1366px){
      html{
          font-size:92%;
      }
  }

  @media (max-width: 720px){
    html{
        font-size: 87.5%; //14px
    }
  }
`