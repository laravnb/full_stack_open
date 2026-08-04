import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/filter";
import PersonForm from "./components/form";
import Persons from "./components/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  };
  useEffect(hook, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addEntry = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };
    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const personsToShow = searchTerm
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={searchTerm}
        onChange={handleSearchChange}
        text="filter shown with"
      />
      <h3>add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={addEntry}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
