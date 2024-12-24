// src/reducers/anecdoteReducer.js
import { createSlice } from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    initializeAnecdotes: (state, action) => action.payload,
    createAnecdote: (state, action) => {
      state.push(action.payload);
    },
    voteAnecdote: (state, action) => {
      const id = action.payload;
      const anecdote = state.find(a => a.id === id);
      if (anecdote) {
        anecdote.votes += 1;
      }
    },
  },
});

export const { initializeAnecdotes, createAnecdote, voteAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
