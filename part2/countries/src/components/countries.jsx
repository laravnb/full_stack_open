const countryLanguages = (country) =>
  country.languages ? Object.values(country.languages) : [];

const CountryDetails = ({ country, onHide }) => {
  const languages = countryLanguages(country);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital {country.capital?.[0] || country.capital || "n/a"}</div>
      <div>Area {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      {country.flags?.svg && (
        <>
          <img
            src={country.flags.svg}
            alt={`${country.name.common} flag`}
            width={300}
          />
          {onHide && <button onClick={onHide}>hide</button>}
        </>
      )}
    </div>
  );
};

const CountryList = ({ countries, onSelectCountry }) => (
  <div>
    {countries.map((country) => (
      <div key={country.name.common}>
        <span>{country.name.common}</span>
        <button onClick={() => onSelectCountry(country.name.common)}>
          show
        </button>
      </div>
    ))}
  </div>
);

const Countries = ({
  countries,
  selectedCountryName,
  onSelectCountry,
  onClearSelection,
}) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify</div>;
  }

  const selectedCountry = selectedCountryName
    ? countries.find((country) => country.name.common === selectedCountryName)
    : null;

  if (selectedCountry) {
    return (
      <>
        <CountryList countries={countries} onSelectCountry={onSelectCountry} />
        <CountryDetails country={selectedCountry} onHide={onClearSelection} />
      </>
    );
  }

  if (countries.length > 1) {
    return (
      <CountryList countries={countries} onSelectCountry={onSelectCountry} />
    );
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  }

  return null;
};

export default Countries;
