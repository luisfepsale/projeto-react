import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { createTheme } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.min.css';
import WebRouters from './routes/webRouters';

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <StyledThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WebRouters />
      </ThemeProvider>
    </StyledThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);