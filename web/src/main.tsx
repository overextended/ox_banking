import { MantineProvider } from '@mantine/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
