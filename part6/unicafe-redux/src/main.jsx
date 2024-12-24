// src/main.jsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import reducer from './reducer';

// Create Redux store
const store = configureStore({ reducer });

// Render the App component wrapped with Redux Provider
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
