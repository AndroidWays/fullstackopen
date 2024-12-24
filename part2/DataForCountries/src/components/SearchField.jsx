// components/SearchField.jsx
import React from 'react';

const SearchField = ({ searchString, setSearchString }) => {
  return (
    <div>
      <label htmlFor="search">Search country: </label>
      <input
        type="text"
        id="search"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
    </div>
  );
};

export default SearchField;
