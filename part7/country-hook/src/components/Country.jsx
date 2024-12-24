import React from 'react';

const Country = ({ countries, onSelectCountry }) => {
  if (countries.length === 0) {
    return null;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <p>Region: {country.region}</p>
        <img src={country.flags.svg} alt={country.name.common} style={{ width: '150px' }} />
      </div>
    );
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => onSelectCountry(country)}>show</button>
        </li>
      ))}
    </ul>
  );
};

export default Country;
