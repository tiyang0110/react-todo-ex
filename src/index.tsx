import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { theme } from './theme';

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error('root is undefined');
const root = ReactDOM.createRoot(rootEl);


root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
);