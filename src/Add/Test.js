import React, { Component } from 'react';

class ContactList extends Component {
    render() {
        const people = [
            { name: 'Albert'},
            { name: 'Liana'},
            { name: 'Leart'},
            { name: 'Vjollca'}
        ]
    
        return <ol>
            {people.map( person => (
                <li key={person.name}>{person.name}</li>
            ))}
        </ol>
    }
}

export default ContactList