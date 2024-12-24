import React, { useState, useEffect } from 'react';
import useField from './hooks/useField';
import useCountry from './hooks/useCountry';
import Country from './components/Country';
import './index.css'; // Import CSS for styling

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const { countries, loading, error } = useCountry(name);

  // Auto-update name state on input change
  useEffect(() => {
    setName(nameInput.value);
  }, [nameInput.value]);

  const reset = () => {
    nameInput.reset(); // Reset the input field
    setName(''); // Clear the name state
  };

  const handleSelectCountry = (country) => {
    setName(country.name.common); // Set the name to the selected country
    nameInput.reset(); // Reset the input field
  };

   return (
    <div className="app">
      <form onSubmit={fetch}>
        <input
          type={nameInput.type}
          value={nameInput.value}
          onChange={nameInput.onChange}
          placeholder="Type a country name..."
        />
        <button type="submit">Find</button>
        <button type="button" onClick={reset}>Reset</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Country countries={countries} onSelectCountry={handleSelectCountry} />
    </div>
  );
};

export default App;
