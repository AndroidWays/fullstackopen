// src/App.jsx
import React from 'react';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { NotificationProvider } from './contexts/NotificationContext';

const App = () => {
  return (
    <NotificationProvider>
      <h1>Anecdote App</h1>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList />
    </NotificationProvider>
  );
};

export default App;
