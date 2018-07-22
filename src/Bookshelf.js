import React, {Component} from 'react';

import Books from './Books'

/*
  This component represents a shelf and it holds all its corresponding Books;
  The Bookshef title comes from props and it's separated from the Books props
*/
class Bookshelf extends Component {

  render() {

    var { title, ...other } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <Books {...other} />
        </div>
      </div>
    );
  }
}

export default Bookshelf;
