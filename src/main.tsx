import React from 'react';
import './assets/styles/index.scss';
import App from './app/App';
import './api/authorithation/call-anonym-flow';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
