import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './index.css';

import App from './App';
import { QueryProvider } from './providers/QueryProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <App />
        <ToastContainer />
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
