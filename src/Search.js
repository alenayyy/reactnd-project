import React, {Component} from 'react';
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'

import Books from './Books'

/*
  This component handles the Search of Books by title or author;
  It uses the SearchAPI to search and then it renderes the results using the Books component
*/
class Search extends Component {

  state = {
    searchResults: []
  }

  searchBooks = (e) => {
    if(e.target.value) {
      BooksAPI.search(e.target.value).then((results) => {
        if(Array.isArray(results)) {
          this.setState({searchResults: results});
        }
        else if(results.items) {
          this.setState({searchResults: results.items});
        }
      });
    }
    else {
      this.setState({searchResults: []});
    }
  }

  render() {

    let books = this.state.searchResults.map(book => {
      book.shelf = this.props.libraryBooks.get(book.id) || 'none';
      return book;
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/* <!-- ========== when this link is clicked, React routes to the Library component (according to the Router settings in App.js) ========== --> */}
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.searchBooks}/>
          </div>
        </div>
        <div className="search-books-results">
          <Books  books={books}
                  moveBook={this.props.moveBook}/>
        </div>
      </div>
    );
  }
}

export default Search;
