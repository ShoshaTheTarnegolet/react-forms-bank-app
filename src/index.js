import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.render(
  <React.StrictMode>
      <CssBaseline />
      <Container maxWidth="l">
    <App />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);
