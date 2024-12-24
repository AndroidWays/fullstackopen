// src/App.jsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Action creators
const incrementGood = () => ({ type: 'GOOD' });
const incrementOk = () => ({ type: 'OK' });
const incrementBad = () => ({ type: 'BAD' });
const reset = () => ({ type: 'ZERO' });

const App = () => {
  const dispatch = useDispatch();
  const good = useSelector((state) => state.good);
  const ok = useSelector((state) => state.ok);
  const bad = useSelector((state) => state.bad);

  // Handlers
  const handleGood = () => dispatch(incrementGood());
  const handleOk = () => dispatch(incrementOk());
  const handleBad = () => dispatch(incrementBad());
  const handleReset = () => dispatch(reset());

  return (
    <div style={{ textAlign: 'left', marginTop: '20px' }}>
      <h1>Unicafe Feedback</h1>
      <button onClick={handleGood}>Good</button>
      <button onClick={handleOk}>Ok</button>
      <button onClick={handleBad}>Bad</button>
      <button onClick={handleReset}>Reset Stats</button>
      <div style={{ marginTop: '20px' }}>
        <h2>Statistics</h2>
        <p>Good: {good}</p>
        <p>Ok: {ok}</p>
        <p>Bad: {bad}</p>
      </div>
    </div>
  );
};

export default App;
