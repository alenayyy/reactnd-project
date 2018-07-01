import React, {Component} from 'react';

import Books from './Books'

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
