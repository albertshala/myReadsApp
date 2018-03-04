import React, { Component } from 'react';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.book.shelf};
    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 189, backgroundImage: `url(${this.props.book.imageLinks && this.props.book.imageLinks.smallThumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <select value={this.state.value} onChange={ (item) => { this.props.onUpdateBookCategory(this.props.book, item.target.value) } }>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors}</div>
            </div>
        )
    }
}

export default Book