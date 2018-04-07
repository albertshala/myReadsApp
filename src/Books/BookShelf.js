import React, { Component } from 'react';
import Book from './Book'
import PropTypes from 'prop-types';
import { getFullCategoryName} from "../utils/category.filter";

class BookShelf extends Component {
    render() {
        const {books, currentCategory, onUpdateBookCategory} = this.props;
        return(
            <div>
                {currentCategory.map((catName) => (
                <div className="bookshelf" key={catName}>
                    <h2 className="bookshelf-title">{getFullCategoryName(catName)}</h2>
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

BookShelf.PropTypes = {
	book: PropTypes.array.isRequired,
	currentCategory: PropTypes.array.isRequired,
	onUpdateBookCategory: PropTypes.func.isRequired
};

export default BookShelf

































