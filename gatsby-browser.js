import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './src/components/GlobalStyles';
import Layout from './src/components/Layout';

export const wrapPageElement = ({ element, props }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Layout {...props}>
      <AnimatePresence mode="wait">
        {element}
      </AnimatePresence>
    </Layout>
  </ThemeProvider>
);