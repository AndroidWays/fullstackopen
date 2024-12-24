// src/components/AnecdoteDetail.jsx
import { useParams, Link } from 'react-router-dom';

const AnecdoteDetail = ({ anecdotes }) => {
  const { id } = useParams();
  const anecdote = anecdotes.find(a => a.id === parseInt(id));

  if (!anecdote) {
    return <p>An anecdote with this ID does not exist.</p>;
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p><strong>Author:</strong> {anecdote.author}</p>
      <p><strong>Info:</strong> <a href={anecdote.info} target="_blank" rel="noopener noreferrer">{anecdote.info}</a></p>
      <Link to="/">back to anecdotes</Link>
    </div>
  );
};

export default AnecdoteDetail;
