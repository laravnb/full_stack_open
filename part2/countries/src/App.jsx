import { useState, useEffect } from "react";
import "./index.css";
import countryService from "./services/countries";
import Search from "./components/search";
import Countries from "./components/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  console.log("render", countries.length, "countries");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = searchTerm
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const countryMaxExceeded = filteredCountries.length > 10;
  const tooManyMatchesMessage =
    countryMaxExceeded && "Too many matches, specify";
  const countriesToShow = countryMaxExceeded ? [] : filteredCountries;

  return (
    <div>
      <Search
        value={searchTerm}
        onChange={handleSearchChange}
        text="find countries"
      />
      {tooManyMatchesMessage ? (
        <div>{tooManyMatchesMessage}</div>
      ) : (
        <Countries countries={countriesToShow} />
      )}
    </div>
  );
};

export default App;
