import { Component } from 'react';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  handleSubmit = e => {
    e.preventDefault();
    const { submit } = this.props;

    submit({ ...this.state });
    this.setState({ name: '', number: '' });
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({ [name]: value }));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Name</p>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={this.handleChange}
          value={this.state.name}
        />
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={this.handleChange}
          value={this.state.number}
        />
        <button>Add contact</button>
      </form>
    );
  }
}
