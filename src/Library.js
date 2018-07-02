import React, {Component} from 'react';

import Bookshelf from './Bookshelf'
import { Link } from 'react-router-dom'

class Library extends Component {

  render() {

    let currentlyReading = this.props.books ? this.props.books.filter(book => book.shelf === 'currentlyReading') : [];
    let wantToRead = this.props.books ? this.props.books.filter(book => book.shelf === 'wantToRead') : [];
    let read = this.props.books ? this.props.books.filter(book => book.shelf === 'read') : [];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf  title="Currently Reading"
                        key="currentlyReading"
                        bookshelfId="currentlyReading"
                        books={currentlyReading}
                        moveBook={this.props.moveBook} />

            <Bookshelf  title="Want to Read"
                        key="wantToRead"
                        bookshelfId="wantToRead"
                        books={wantToRead}
                        moveBook={this.props.moveBook} />

            <Bookshelf  title="Read"
                        key="read"
                        bookshelfId="read"
                        books={read}
                        moveBook={this.props.moveBook} />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search' className='add-contact'>Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Library;
