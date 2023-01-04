import { createGlobalStyle } from 'styled-components';
import colors from './assets/colors';

export const GlobalStyle = createGlobalStyle`


*, *::before, *::after {
  box-sizing: border-box;
}

  body {
    margin: 0;
    padding: 0;
  }

  /* img {
    display: block;
    min-width: 100%;
  } */

  .App {
    font-family: 'League Spartan', sans-serif;
    background: ${() => colors.bg}

  }
`;
