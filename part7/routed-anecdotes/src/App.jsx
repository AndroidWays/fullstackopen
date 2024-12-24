import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Footer from './components/Footer';
import Menu from './components/Menu';
import CreateNew from './components/CreateNew';
import About from './components/About';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteDetail from './components/AnecdoteDetail';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ]);

  const [notification, setNotification] = useState(''); // State for notification

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification('Anecdote added successfully!'); // Set notification message
    setTimeout(() => setNotification(''), 5000); // Clear notification after 5 seconds
  };

  return (
    <div className="app-container">
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && <div className="notification">{notification}</div>} {/* Display notification */}
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route path="/anecdotes/:id" element={<AnecdoteDetail anecdotes={anecdotes} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
