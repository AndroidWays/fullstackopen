import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchField from "./components/SearchField";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";

const API_KEY = "a567857e91ca6dec8b33bae779a9806d"; // Replace with your actual key

const App = () => {
  const [searchString, setSearchString] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchString.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [countries, searchString]);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <SearchField
        searchString={searchString}
        setSearchString={setSearchString}
      />
      {filteredCountries.length === 0 ? (
        <p>No countries found.</p>
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches, please be more specific.</p>
      ) : filteredCountries.length === 1 && !selectedCountry ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        <CountryList
          countries={filteredCountries}
          handleCountryClick={handleCountryClick}
        />
      )}
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
};

export default App;
