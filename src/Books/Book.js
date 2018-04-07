import React from 'react';
import PropTypes from 'prop-types';

const Book = (props) => {
		const {book, onUpdateBookCategory} = props;
		return (
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{
						width: 128,
						height: 189,
						backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail})`
					}}></div>
					<div className="book-shelf-changer">
						<select value={book.shelf} onChange={(item) => {
							onUpdateBookCategory(book, item.target.value)
						}}>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
				<div className="book-authors">{book.authors}</div>
			</div>
		)
};

Book.PropTypes = {
	book: PropTypes.string.isRequired,
	onUpdateBookCategory: PropTypes.func.isRequired
};

export default Book