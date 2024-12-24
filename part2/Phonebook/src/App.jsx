import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import services from './Services';
import Notification from './components/Notification';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    services.getAll()
      .then(data => {
        setPersons(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setPersons([]);
      });
  }, []);

  const addPerson = event => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    services.create(newPerson)
      .then(data => {
        setPersons(persons.concat(data));
        setNewName('');
        setNewNumber('');
        setNotification(`Added ${newName} successfully!`);
        setIsError(false);
        setTimeout(() => setNotification(null), 5000);
      })
      .catch(error => {
        console.error('Error adding person:', error);
        if (error.response) {
          setNotification(error.response.data.error);
          setIsError(true);
          setTimeout(() => setNotification(null), 10000);
        }
      });
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const deletePerson = id => {
    const person = persons.find(p => p.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if (confirmDelete) {
      services.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id));
          setNotification(`Deleted ${person.name} successfully!`);
          setIsError(false);
          setTimeout(() => setNotification(null), 5000);
        })
        .catch(error => {
          console.error('Error deleting person:', error);
          setNotification(`Error deleting ${person.name}: ${error.message}`);
          setIsError(true);
          setTimeout(() => setNotification(null), 10000);
        });
    }
  };

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} isError={isError} />
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
