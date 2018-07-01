import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Bookshelf from './Bookshelf'
import SearchView from './SearchView'
import Books from './Books'

import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'



class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    searchResults: []
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

  searchBooks = (e) => {
    BooksAPI.search(e.target.value).then((books) => {
      this.setState({searchResults: books})
    })
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
        <Route exact path='/' render={() => (
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
                            moveBook={this.moveBook} />

                <Bookshelf  title="Want to Read"
                            key="wantToRead"
                            bookshelfId="wantToRead"
                            books={wantToRead}
                            moveBook={this.moveBook} />

                <Bookshelf  title="Read"
                            key="read"
                            bookshelfId="read"
                            books={read}
                            moveBook={this.moveBook} />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search' className='add-contact'>Add a book</Link>              
            </div>
          </div>
        )}/>

        <Route path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className='close-search'>Close</Link>
              {/* <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a> */}
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={this.searchBooks}/>

              </div>
            </div>
            <div className="search-books-results">
              <Books  books={this.state.searchResults}
                      moveBook={this.moveBook}/>
            </div>
          </div>
        )}/>

      </div>
    )
  }
}

export default BooksApp
