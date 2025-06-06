import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';
import { CookiesProvider } from 'react-cookie'
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/',  }}>
      <App />
      <ToastContainer />
    </CookiesProvider>
  </React.StrictMode>
);
