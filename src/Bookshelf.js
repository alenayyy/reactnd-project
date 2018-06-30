import React, {Component} from 'react';

import Book from './Book'

class Bookshelf extends Component {

  render() {

    let bookComponents = [];
    this.props.books.forEach( book => {
      bookComponents.push(
        <Book backgroundImage={book.imageLinks.thumbnail}
          imageWidth="128"
          imageHeight="192"
          key={book.id}
          bookTitle={book.title}
          bookAuthors={book.authors}
        />
      )
    });

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {bookComponents}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
