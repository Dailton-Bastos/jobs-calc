import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '~/App';
import { GlobalStyles } from '~/styles/global';

import './index.css';

const rootElement = document.querySelector('[data-js="root"]');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
    <GlobalStyles />
  </React.StrictMode>,
);
