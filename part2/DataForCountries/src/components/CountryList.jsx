// components/CountryList.jsx
import React from 'react';

const CountryList = ({ countries, handleCountryClick }) => {
  return (
    <div>
      {countries.map(country => (
        <div key={country.cca3}>
          <span>{country.name.common}</span>
          <button onClick={() => handleCountryClick(country)}>Show</button>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
