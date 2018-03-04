import React from 'react'
import './App.css'
import SearchPage from './SearchPage'
import { Link, Route } from 'react-router-dom';
import BookShelf from './Books/BookShelf'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    categories: ["currentlyReading","wantToRead","read"],
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
      BooksAPI.update(book, newShelf)
          .then( () => {
              this.setState( (prevState) => {
                  myBooks: prevState.myBooks.filter( (b) => {
                      if(b.id === book.id) {
                          b.shelf = newShelf;
                      }
                  })
              });
          }).catch( (error) => {
          console.error(error);
      });
  };

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
                    <Link to="/search">Add a book</Link>
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
