// src/services/anecdotes.js
import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const createAnecdote = async (content) => {
  try {
    const response = await axios.post(baseUrl, { content, votes: 0 });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error('Anecdote content must be at least 5 characters long');
    }
    throw error;
  }
};

export default { createAnecdote };
