import React, {Component} from 'react';
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'

import Books from './Books'

class Search extends Component {

  state = {
    searchResults: []
  }

  searchBooks = (e) => {
    BooksAPI.search(e.target.value).then((books) => {
      this.setState({searchResults: books})
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.searchBooks}/>
          </div>
        </div>
        <div className="search-books-results">
          <Books  books={this.state.searchResults}
                  moveBook={this.props.moveBook}/>
        </div>
      </div>
    );
  }
}

export default Search;
