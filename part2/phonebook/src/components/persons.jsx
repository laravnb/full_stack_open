const Person = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  );
};

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((p) => (
        <Person key={p.id} person={p} />
      ))}
    </ul>
  );
};

export default Persons;
