import { useState, useEffect } from "react";
import "./index.css";
import countryService from "./services/countries";
import Search from "./components/search";
import Countries from "./components/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountryName, setSelectedCountryName] = useState(null);

  useEffect(() => {
    countryService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  const filteredCountries = searchTerm
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  useEffect(() => {
    if (
      selectedCountryName &&
      !filteredCountries.some((country) => country.name.common === selectedCountryName)
    ) {
      setSelectedCountryName(null);
    }
  }, [filteredCountries, selectedCountryName]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Search
        value={searchTerm}
        onChange={handleSearchChange}
        text="find countries"
      />
      <Countries
        countries={filteredCountries}
        selectedCountryName={selectedCountryName}
        onSelectCountry={setSelectedCountryName}
        onClearSelection={() => setSelectedCountryName(null)}
      />
    </div>
  );
};

export default App;
