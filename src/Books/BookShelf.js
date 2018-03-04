import React, { Component } from 'react';
import Book from './Book'

class BookShelf extends Component {

    getFullCategoryName(catName){
        switch (catName){
            case 'currentlyReading':
                return 'Currently Reading';
            case 'wantToRead':
                return 'Want to Read';
            case 'read':
                return 'Read';
            default:
                return 'None';
        }
    }

    render() {
        const {books, currentCategory, onUpdateBookCategory} = this.props;
        return(
            <div>
                {currentCategory.map((catName) => (
                <div className="bookshelf" key={catName}>
                    <h2 className="bookshelf-title">{this.getFullCategoryName(catName)}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        {books.filter(book => book.shelf === catName).map( (aBook) => (
                            <li key={aBook.title + aBook.id}>
                                <Book onUpdateBookCategory={onUpdateBookCategory } book={aBook} />
                            </li>
                        ))}
                        </ol>
                    </div>
                </div>
                ))}
            </div>
        )
    }
}

export default BookShelf

































