import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import {Link} from 'react-router-dom';
import sortBy from 'sort-by';
import BookShelf from './Books/BookShelf';

class SearchPage extends Component {

  state = {
    query: '',
    latestBooks: [],
    myBooks: []
  };

  updateQuery = (query) => {
      this.setState({query: query.trim()});
  };

  render() {
    const {books} = this.props;
    const {query} = this.state;

    let showBooks;
    if (query) {
        const match = new RegExp( escapeRegExp(query, 'i') );
        showBooks = books.filter((book) => match.test(book.title));
    } else {
        showBooks = books;
    }
        showBooks.sort(sortBy('title'));

    return(
      <div className="search-books">
      <div className="search-books-bar">
        <Link to={{
          pathname: '/',
          state: {showSearchPage: false}
        }} className='close-search'>Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event)=> this.updateQuery(event.target.value)}/>
        </div>
      </div>
      <div className="search-books-results">
        <BookShelf books={showBooks} currentCategory={ this.props.currentCategory } onUpdateBookCategory={this.props.onUpdateBookCategory } />
      </div>
    </div>
    )
  }
}

export default SearchPage