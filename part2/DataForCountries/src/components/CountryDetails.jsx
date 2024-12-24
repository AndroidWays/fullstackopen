import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryDetails = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=a567857e91ca6dec8b33bae779a9806d`);
        setWeatherData(response.data);
      } catch (error) {
        setError('Error fetching weather data');
      }
      setLoading(false);
    };

    fetchData();
  }, [country]);

  const getWeatherIconUrl = (weatherCode) => {
    switch (weatherCode) {
      case '01d':
        return 'https://openweathermap.org/img/wn/01d.png';
      case '02d':
        return 'https://openweathermap.org/img/wn/02d.png';
      case '03d':
        return 'https://openweathermap.org/img/wn/03d.png';
      case '04d':
        return 'https://openweathermap.org/img/wn/04d.png';
      case '09d':
        return 'https://openweathermap.org/img/wn/09d.png';
      case '10d':
        return 'https://openweathermap.org/img/wn/10d.png';
      case '11d':
        return 'https://openweathermap.org/img/wn/11d.png';
      case '13d':
        return 'https://openweathermap.org/img/wn/13d.png';
      case '50d':
        return 'https://openweathermap.org/img/wn/50d.png';
      default:
        return null; // Return null for unknown weather codes
    }
  };

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p><strong>Capital:</strong> {country.capital}</p>
      <p><strong>Population:</strong> {country.population}</p>
      <p><strong>Area:</strong> {country.area} square kilometers</p>
      <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h3>Weather</h3>
          <img src={getWeatherIconUrl(weatherData.weather[0].icon)} alt="Weather Icon" />
          <p><strong>Temperature:</strong> {Math.round(weatherData.main.temp - 273.15)}°C</p>
          <p><strong>Description:</strong> {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;