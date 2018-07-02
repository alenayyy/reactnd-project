import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Library from './Library'
import Search from './Search'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {

  state = {
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
      }
      else {
        BooksAPI.get(bookId).then((book) => {
            books.push(book);
        })
      }
      this.setState({
        books: books
      })
    });
  }

  componentDidMount() {
  	this.updateBooks();
  }

  render() {

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Library books={this.state.books}
                   moveBook={this.moveBook}
          />
        )}/>

        <Route path='/search' render={() => (
          <Search moveBook={this.moveBook} />
        )}/>

      </div>
    )
  }
}

export default BooksApp
