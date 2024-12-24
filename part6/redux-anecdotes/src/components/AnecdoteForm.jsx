// src/components/AnecdoteForm.jsx
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../api';
import { useNotification } from '../contexts/NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { dispatch: notificationDispatch } = useNotification();

  const mutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries(['anecdotes']); // Refetch anecdotes
      notificationDispatch({
        type: 'SHOW_NOTIFICATION',
        payload: { message: `Created anecdote: "${newAnecdote.content}"`, timeout: 5000 },
      });
    },
    onError: () => {
      notificationDispatch({
        type: 'SHOW_NOTIFICATION',
        payload: { message: 'Error creating anecdote', timeout: 5000 },
      });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    if (content.length < 5) {
      notificationDispatch({
        type: 'SHOW_NOTIFICATION',
        payload: { message: 'Anecdote must be at least 5 characters long', timeout: 5000 },
      });
      return;
    }

    mutation.mutate(content);
    event.target.anecdote.value = '';
  };

  return (
    <div style={{ padding: '0', maxWidth: '600px', margin: '0', }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left', }}
      >
        <input
          name="anecdote"
          style={{
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            flex: '1'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 15px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer'
          }}
        >
            Create new
        </button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
