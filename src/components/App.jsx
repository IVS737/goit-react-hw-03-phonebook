import { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],

    filter: '',
  };

  handleSubmit = newContact => {
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    )
      return alert('This contact has already added');

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: nanoid(), ...newContact }],
    }));
  };

  handleFilterChange = ({ target }) => this.setState({ filter: target.value });

  handleDeleteContact = id =>
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));

  getFilteredContact = () => {
    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  render() {
    const filteredContacts = this.getFilteredContact();
    return (
      <div className={styles.Container}>
        <h1>Phonebook</h1>
        <ContactForm submit={this.handleSubmit} />

        <h2>Contacts</h2>
        <input
          name="filter"
          onChange={this.handleFilterChange}
          value={this.state.filter}
        />

        <ContactList
          onDeleteContact={this.handleDeleteContact}
          contacts={filteredContacts}
        />
      </div>
    );
  }
}
