import { Component } from 'react';

export class ContactList extends Component {
  render() {
    const { onInputChange, contacts, filter, onDeleteContact } = this.props;

    return (
      <div>
        <input name="filter" onChange={onInputChange} />
        {contacts
          .filter(({ name }) =>
            name.toLowerCase().includes(filter.toLowerCase())
          )
          .map(({ id, name, phone }) => (
            <div key={id}>
              <p>
                {name} {phone}
              </p>
              <button onClick={() => onDeleteContact(id)}>Delete</button>
            </div>
          ))}
      </div>
    );
  }
}
