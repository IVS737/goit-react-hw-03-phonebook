import { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [],

    filter: '',
  };

  componentDidMount() {
    const localItem = localStorage.getItem('contacts');
    const parsedItems = JSON.parse(localItem);
    console.log(parsedItems);
    // this.setState({ contacts: [parsedItems] });
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

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
