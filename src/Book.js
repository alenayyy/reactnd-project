import React, {Component} from 'react';

import BookShelfChanger from './BookShelfChanger'

class Book extends Component {
  render() {

    let bookCoverBackroundImage = "url("+this.props.backgroundImage+")";
    let imageWidth = parseInt(this.props.imageWidth, 10);
    let imageHeight = parseInt(this.props.imageHeight, 10);

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: imageWidth, height: imageHeight, backgroundImage: bookCoverBackroundImage }}></div>
          <BookShelfChanger/>
        </div>
        <div className="book-title">{this.props.bookTitle}</div>
        <div className="book-authors">{this.props.bookAuthors}</div>
      </div>
    );
  }
}

export default Book;
