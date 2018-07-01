import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Bookshelf from './Bookshelf'
import SearchBar from './SearchBar'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  updateBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  moveBook = (bookId, bookshelfId) => {
    BooksAPI.update({id: bookId}, bookshelfId).then(() => {
      let books = this.state.books;
      const i = books.findIndex(book => book.id === bookId);
      if(i >= 0) {
        books[i].shelf = bookshelfId;
        this.setState({
          books: books
        })
      }
    });
  }

  componentDidMount() {
  	this.updateBooks();
  }

  render() {

    let currentlyReading = this.state.books ? this.state.books.filter(book => book.shelf === 'currentlyReading') : [];
    let wantToRead = this.state.books ? this.state.books.filter(book => book.shelf === 'wantToRead') : [];
    let read = this.state.books ? this.state.books.filter(book => book.shelf === 'read') : [];

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBar />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf  title="Currently Reading"
                            key="currentlyReading"
                            id="currentlyReading"
                            books={currentlyReading}
                            moveBook={this.moveBook} />

                <Bookshelf  title="Want to Read"
                            key="wantToRead"
                            id="wantToRead"
                            books={wantToRead}
                            moveBook={this.moveBook} />

                <Bookshelf  title="Read"
                            key="read"
                            id="read"
                            books={read}
                            moveBook={this.moveBook} />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
