import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactList from './ContactList';
import ContactForm from './ContactForm';
import './App.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    // Fetch contacts from the API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching contacts:', error));
  }, []);

  const addContact = async (newContact) => {
    try {
      // Make a dummy POST call to the API
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact),
      });

      if (response.ok) {
        const data = await response.json();
        setContacts((prevContacts) => [...prevContacts, { ...newContact, id: uuidv4(), ...data }]);
      } else {
        console.error('Failed to add contact:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const deleteContact = async (id) => {
    try {
      // Make a dummy DELETE call to the API
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
      } else {
        console.error('Failed to delete contact:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const editContact = (id) => {
    // Set the selectedContact state to enable editing
    const contactToEdit = contacts.find((contact) => contact.id === id);
    setSelectedContact(contactToEdit);
  };

  const updateContact = async (updatedContact) => {
    try {
      // Make a dummy PUT call to the API
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${selectedContact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      });

      if (response.ok) {
        setContacts((prevContacts) =>
          prevContacts.map((contact) => (contact.id === selectedContact.id ? updatedContact : contact))
        );
        setSelectedContact(null); // Reset selectedContact after editing
      } else {
        console.error('Failed to update contact:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  return (
    <div>
      <h1>Contact List App</h1>
      <ContactList contacts={contacts} onDelete={deleteContact} onEdit={editContact} />
      <ContactForm onSubmit={selectedContact ? updateContact : addContact} initialContact={selectedContact} />
    </div>
  );
};

export default App;
