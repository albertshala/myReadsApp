import React from 'react'
import './App.css'
import SearchPage from './SearchPage'
import { Link, Route } from 'react-router-dom';
import BookShelf from './Books/BookShelf'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    categories: ["currentlyReading","wantToRead","read"],
    currentCategory: null,
    myBooks: []
  };

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          this.setState({
              myBooks: books
          });
      });
  }

  updateCategory = (book, newShelf) => {
      this.setState( (state) => {
          myBooks: state.myBooks.filter( (b) => {
              if(b.id === book.id) {
                  b.shelf = newShelf;
              }
          });
      });

  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <BookShelf books={this.state.myBooks} currentCategory={ this.state.categories } onUpdateBookCategory={this.updateCategory} />
                </div>
                <div className="open-search">
                    <Link to="/search" onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
                </div>
            </div>
        )}/>

        <Route path="/search" render={() => (
                <SearchPage books={this.state.myBooks} currentCategory={ this.state.categories } onUpdateBookCategory={this.updateCategory} />
            )}
        />
      </div>
    )
  }
}

export default BooksApp
