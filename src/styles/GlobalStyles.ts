import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', Arial, sans-serif;
  }

  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
  }

  button {
    cursor: pointer;
  }
`;