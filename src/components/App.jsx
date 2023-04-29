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
    name: '',
    filter: '',
    number: '',
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const name = Object.values({ ...evt.target }).find(
      item => item?.name === 'name'
    ).value;

    const phone = Object.values({ ...evt.target }).find(
      item => item?.name === 'number'
    ).value;

    if (this.state.contacts.find(contact => contact.name === name))
      return alert('This contact has already added');

    this.setState(state => ({
      ...state,
      name,
      contacts: [...state.contacts, { id: nanoid(), name, phone }],
    }));
  };

  handleFilterChange = ({ target }) =>
    this.setState(state => ({
      ...state,
      filter: target.value,
    }));

  handleDeleteContact = id =>
    this.setState(state => ({
      ...state,
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));

  render() {
    return (
      <div className={styles.Container}>
        <ContactForm submit={this.handleSubmit} />

        <ContactList
          onDeleteContact={this.handleDeleteContact}
          onInputChange={this.handleFilterChange}
          contacts={this.state.contacts}
          filter={this.state.filter}
        />
      </div>
    );
  }
}
