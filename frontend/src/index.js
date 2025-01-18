import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import the global styles
import App from './App'; // Main App component
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);