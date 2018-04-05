import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Book from './Books/Book';
import * as BooksAPI from './BooksAPI'

class SearchPage extends Component {

	constructor(props) {
		super(props);

		this.state = {
			query: '',
			books: []
		};
	}

	componentWillReceiveProps() {
		this.updateQuery(this.state.query);
	}

	updateQuery = (query) => {
		if (query !== '' && query.length > 0) {
			let result = [];
			this.setState({query: query});
			//Make a request to the search api, remove white spaces from query
			BooksAPI.search(query.trim())
				.then((searchResults) => {
					result = searchResults && searchResults.length > 0
						&& searchResults.map(book => {
							//default set category to none
							book.shelf = 'none';
							//loop over books from main route
							this.props.books.forEach(passedInBooks => {
								if (passedInBooks.id === book.id) {
									book.shelf = passedInBooks.shelf;
								}
							});

							return book;
						});

					this.setState({
						books: result
					});

				}).catch((error) => {
				console.error(error);
			});
		} else {
			this.setState({query: '', books: []});
		}
	};

	render() {
		const {query, books} = this.state;
		//const {currentCategory} = this.props;
		const showBooks = query && books && books.length > 0 ? books : []
		//let updatedShelfs = currentCategory.concat('none');

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to={{
						pathname: '/',
						state: {showSearchPage: false}
					}} className='close-search'>Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author" value={this.state.query}
						       onChange={(event) => this.updateQuery(event.target.value)}/>
					</div>
				</div>
				<div className="search-books-results">

					<div className="bookshelf-books">
						<ol className="books-grid">
							{showBooks.map( (aBook) => (
								<li key={aBook.title + aBook.id}>
									<Book onUpdateBookCategory={this.props.onUpdateBookCategory } book={aBook} />
								</li>
							))}
						</ol>
					</div>

				</div>
			</div>
		)
	}
}

export default SearchPage