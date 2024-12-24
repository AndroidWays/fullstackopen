// src/components/AnecdoteList.jsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, voteAnecdote } from '../api';
import { useNotification } from '../contexts/NotificationContext';

const AnecdoteList = () => {
  const queryClient = useQueryClient();
  const { dispatch: notificationDispatch } = useNotification();

  const { data: anecdotes, isLoading, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false, // Disable retries for error handling
  });

  const mutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries(['anecdotes']); // Refetch anecdotes
      notificationDispatch({
        type: 'SHOW_NOTIFICATION',
        payload: { message: `You voted for "${anecdote.content}"`, timeout: 5000 },
      });
    },
    onError: () => {
      notificationDispatch({
        type: 'SHOW_NOTIFICATION',
        payload: { message: 'Error voting for anecdote', timeout: 5000 },
      });
    },
  });

  const handleVote = (anecdote) => {
    mutation.mutate(anecdote);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  return (
    <div style={{ padding: '0', maxWidth: '600px', margin: '0' }}>
      <h2>Anecdote List</h2>
      {sortedAnecdotes.map(anecdote => (
        <div key={anecdote.id} style={{ marginBottom: '10px', border: '1px solid #ddd',padding: '5px', margin: '0' }}>
          <div style={{ fontSize: '16px' }}>{anecdote.content}</div>
          <div style={{ fontSize: '14px', color: '#555' }}>
            has {anecdote.votes} votes
            <button
              onClick={() => handleVote(anecdote)}
              style={{ marginLeft: '10px', padding: '3px 10px', border: 'none', margin: '4px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
