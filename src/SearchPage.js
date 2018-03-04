import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import {Link} from 'react-router-dom';
import sortBy from 'sort-by';
import BookShelf from './Books/BookShelf';
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            query: '',
            latestBooks: [],
            currentCategories: [],
            books: []
        };
    }

  componentWillReceiveProps() {
      let { query } = this.state;
      //Get the latest books
      this.getAllBooks();
      //Check if there are books
      if ( this.state.books.length > 0){
          this.setState({
              books: this.props.books
          }, () => {
              this.updateQuery(query);
          });
      }
  }

  getAllBooks = () => {
      BooksAPI.getAll().then((books) => {
        this.setState({books: books});
      });
  };

  componentWillMount() {
      this.getAllBooks();
  }

  updateQuery = (query) => {
      if ( query !== '' && (query.length && this.state.books.length) > 0){
        //set the query for the search bar
        this.setState({query: query});
        let result = [];
        //Make a request to the search api, remove white spaces from query
        BooksAPI.search(query.trim())
        .then((searchResults) => {
            result = searchResults && searchResults.length > 0
                && searchResults.map(book => {
                //default set category to none
                book.shelf = 'none';
                //loop over books from main route
                this.state.books.forEach(passedInBooks => {
                    if ( passedInBooks.id === book.id ){
                        book.shelf = passedInBooks.shelf;
                    }
                });

                return book;
            });

            this.setState({
                latestBooks: result,
                currentCategories: this.props.currentCategory.concat('none')
            });

        }).catch((error) => {
          console.error(error);
        });
      } else {
          this.setState({query: '', latestBooks: [], currentCategories: []});
      }
  };

  render() {
    const {query, latestBooks} = this.state;
    let showBooks = [];

    if ( query ) {
        const match = new RegExp( escapeRegExp(query, 'i') );
        if ( latestBooks && latestBooks.length > 0 ){
            showBooks = this.state.latestBooks.filter( (book) => match.test(book.title) );
            showBooks.sort(sortBy('title'));
        } else {
            showBooks = [];
        }
    }

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
        <BookShelf books={showBooks} currentCategory={ this.state.currentCategories } onUpdateBookCategory={this.props.onUpdateBookCategory } />
      </div>
    </div>
    )
  }
}

export default SearchPage