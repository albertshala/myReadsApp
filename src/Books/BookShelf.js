import React, { Component } from 'react';
import Book from './Book'

class BookShelf extends Component {

    getFullCategoryName(catName){
        switch (catName){
            case 'currentlyReading':
                return 'Currently Reading';
                break;
            case 'wantToRead':
                return 'Want to Read';
                break;
            case 'read':
                return 'Read';
                break;
            default:
                return 'None';
        }
    }

    render() {
        return(
            <div>
                {this.props.currentCategory.map((catName) => (
                <div className="bookshelf" key={catName}>
                    <h2 className="bookshelf-title">{this.getFullCategoryName(catName)}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        {this.props.books.filter(books => books.shelf === catName).map( (aBook) => (
                            <li key={aBook.id}>
                                <Book onUpdateBookCategory={this.props.onUpdateBookCategory } book={aBook} />
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

































