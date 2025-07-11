import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

  @font-face {
    font-family: 'JeanLucWeb-Bold';
    src: url('/fonts/JeanLucWeb-Bold.woff2') format('woff2'),
         url('/fonts/JeanLucWeb-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
  }

  body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    font-family: 'Inter', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'JeanLucWeb-Bold', 'Inter', sans-serif;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    color: inherit;
    font-family: 'JeanLucWeb-Bold', 'Inter', sans-serif;
    padding: 0;
  }

  #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
    width: 100%;
  }
`;

export const theme = {
  colors: {
    background: '#121212',
    text: 'rgb(252, 248, 201)',
    primary: 'rgb(252, 248, 201)',
    secondary: '#282828',
    accent: '#FFD700',
    projectCardBackground: 'rgb(252, 248, 201)',
    projectCardText: 'grey',
    projectSectionBackground: '#121212',
    footerBackground: '#000000',
    headerBackground: 'rgba(18, 18, 18, 0.9)',
    headerText: 'rgb(252, 248, 201)',
    primaryDark: '#B8A000',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    laptop: '1440px',
  },
  spacings: {
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
    xlarge: '4rem',
  },
  typography: {
    body: '1rem',
  },
};