// components/Filter.js
import React from 'react';

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      Filter countries: <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
};

export default Filter;
