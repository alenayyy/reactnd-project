import React, {Component} from 'react';

/*
  This component represents a BookshelfChanger;
  Is responsible for handling the move of a book from one Bookshelf to another (or removal from the Library - none)
  The move is handled by a function passed in from the App.js
*/
class BookshelfChanger extends Component {

  handleChange = (e) => {
    e.preventDefault();
    this.props.moveBook(this.props.bookId, e.target.value);
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select defaultValue={this.props.id} onChange={this.handleChange}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default BookshelfChanger;
