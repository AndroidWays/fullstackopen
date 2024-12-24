import { useState, useEffect } from 'react';

const useCountry = (name) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (name.trim() === '') {
      setCountries([]);
      return;
    }

    setLoading(true);
    setError(null);

    const fetchCountries = async () => {
      try {
        // Adjust endpoint URL to match API documentation
        const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err.message);
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [name]);

  return { countries, loading, error };
};

export default useCountry;
