// services.js
const getAll = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [];
    }
  };

  const services = {
    getAll,
  };

  export default services;
