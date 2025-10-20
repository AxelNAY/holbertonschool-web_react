import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App.jsx';
import './main.css';

/* Import Roboto font weights */
import '@fontsource/roboto/400.css'; // Regular
import '@fontsource/roboto/500.css'; // Medium
import '@fontsource/roboto/700.css'; // Bold

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
