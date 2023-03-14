import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import { FiltersProvider } from './contexts/FiltersContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <CurrentUserProvider>
        <FiltersProvider>
          <App />
        </FiltersProvider>
      </CurrentUserProvider>
    </ThemeProvider>
  </BrowserRouter>
);
