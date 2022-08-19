import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { customTheme } from './theme';
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <MantineProvider withNormalizeCSS withGlobalStyles theme={customTheme}>
        <App />
      </MantineProvider>
    </HashRouter>
  </React.StrictMode>
);
