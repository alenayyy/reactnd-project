import React from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import Library from './Library'
import Search from './Search'

import './App.css'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  // called when the page loads for the first time
  updateBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  // called when moving a Book from one Bookshelf to another
  moveBook = (bookId, bookshelfId) => {
    BooksAPI.update({id: bookId}, bookshelfId).then(() => {
      let books = this.state.books;
      // find the index of the book in the state.books
      const i = books.findIndex(book => book.id === bookId);
      if(i >= 0) {
        // Book is currently in the Library; assign the right bookselfId  to it or, remove the book from the Library if booksheflId is none
        books[i].shelf = bookshelfId;
        if(bookshelfId === 'none') {
          books.splice(i, 1);
        }
      }
      else {
        // Book is added to the Library to one of the Bookshelves
        BooksAPI.get(bookId).then((book) => {
            book.shelf = bookshelfId;
            books.push(book);
        })
      }

      // udpate the state so that the Library is rendered with the new changes
      this.setState({
        books: books
      })
    });
  }

  // get the Books from the server and place them inside the state
  componentDidMount() {
  	this.updateBooks();
  }

  render() {

    return (
      <div className="app">
        {/* <!-- ========== Library contains Bookshelves with Books ========== --> */}
        <Route exact path='/' render={() => (
          <Library books={this.state.books}
                   moveBook={this.moveBook}
          />
        )}/>

        {/* <!-- ========== Search receives the Books from the Library as props so that the BookshefChanger can be set appropriately for each Book on the Search page ========== --> */}
        <Route path='/search' render={() => (
          <Search moveBook={this.moveBook}
                  libraryBooks={ new Map(this.state.books.map(book => [book.id, book.shelf])) }/>
        )}/>

      </div>
    )
  }
}

export default BooksApp
