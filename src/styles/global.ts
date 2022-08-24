import { createGlobalStyle } from 'styled-components';

const AppColors = {
  primary: '#00c89c',
  darkPrimary: '#00b48c',
  gray: '#161718',
  ligthGray: '#fff',
  secondary: '#0090c8',
  darkSecondary: '#0081b4',
};

export { AppColors };

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --gray-50: '#F7FAFC';
    --red-100: '#FED7D7';
    --orange-200: '#FBD38D';
    --yellow-300: '#F6E05E';
    --green-400: '#48BB78';
    --teal-500: '#319795';
    --blue-600: '#2B6CB0';
    --cyan-700: '#0987A0';
    --purple-800: '#44337A';
    --pink-900: '#521B41';

    --font-type-1-name: 'Roboto';
    --font-type-1-fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
        Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body,
  input,
  textarea,
  select,
  button {
    font-family: var(--font-type-1-name), var(--font-type-1-fallback);
    font-size: 1.6rem;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
