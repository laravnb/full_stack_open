const Countries = ({ countries }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          <p>{country.name.common}</p>
        </div>
      ))}
    </div>
  );
};
export default Countries;
