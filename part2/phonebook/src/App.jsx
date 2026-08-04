import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/filter";
import PersonForm from "./components/form";
import Persons from "./components/persons";
import personService from "./services/numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    personService.getAll().then((initialNumbers) => {
      setPersons(initialNumbers);
    });
  }, []);

  console.log("render", persons.length, "persons");

  const addEntry = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(nameObject).then((returnedNumber) => {
      setPersons((prevPersons) => prevPersons.concat(returnedNumber));
      setNewName("");
      setNewNumber("");
    });
  };
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (!person) return;
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (!confirmDelete) return;

    personService.remove(id).then(() => {
      setPersons((prevPersons) => prevPersons.filter((p) => p.id !== id));
    });
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
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
