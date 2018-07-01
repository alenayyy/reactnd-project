import React, {Component} from 'react';

import Book from './Book'
import BookshelfChanger from './BookshelfChanger'

class Books extends Component {

  render() {

    let books = [];
    this.props.books.forEach( book => {
      books.push(
        <Book backgroundImage={book.imageLinks.thumbnail}
          imageWidth="128"
          imageHeight="192"
          key={book.id}
          bookTitle={book.title}
          bookAuthors={book.authors}>
            <BookshelfChanger id={this.props.bookshelfId || 'none'}
                              bookId={book.id}
                              moveBook={this.props.moveBook} />
        </Book>
      )
    });

    return (
        <ol className="books-grid">
          {books}
        </ol>
    );
  }
}

export default Books;
