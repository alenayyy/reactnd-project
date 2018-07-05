import React, {Component} from 'react';

import Book from './Book'
import BookshelfChanger from './BookshelfChanger'

class Books extends Component {

  render() {

    let books = [];

    this.props.books.forEach( book => {

      let thumbnail = book.imageLinks ? book.imageLinks.thumbnail : 'https://books.google.ro/googlebooks/images/no_cover_thumb.gif';
      let bookshelfId = book.shelf || (this.props.bookshelfId || 'none');

      books.push(
        <Book backgroundImage={thumbnail}
          imageWidth="128"
          imageHeight="192"
          key={book.id}
          bookTitle={book.title}
          bookAuthors={book.authors}>
            <BookshelfChanger id={bookshelfId}
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
