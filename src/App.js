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
    showSearchPage: false
  }

  componentDidMount() {
  	BooksAPI.getAll().then((books) => {
  	  this.setState({ books: books })
  	})
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
                            key="Currently Reading"
                            books={currentlyReading} />

                <Bookshelf  title="Want to Read"
                            key="Want to Read"
                            books={wantToRead} />

                <Bookshelf  title="Read"
                            key="Read"
                            books={read} />
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
