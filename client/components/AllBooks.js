import React from 'react'
import {connect} from 'react-redux'
import {getAllBooksThunk, deleteBook} from '../store/books'
import {Link} from 'react-router-dom'
import {putBookInCart} from '../store/order'

class AllBooks extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getAllBooks()
  }
  handleDelete(id) {
    this.props.deleteBook(id)
  }
  render() {
    const books = this.props.books

    return (
      <div className="books-container">
        {books === undefined || !books.length ? (
          <h3>Loading...</h3>
        ) : (
          books.map(book => (
            <div className="book-container" key={book.id}>
              <div className="book-container-left">
                <img src={book.image} />
              </div>
              <div className="book-container-right">
                <Link to={`/books/${book.id}`}>
                  <p>{book.name}</p>
                </Link>
                {book.author ? (
                  <Link to={`/authors/${book.author.id}`}>
                    <p>Author: {book.author.name}</p>{' '}
                  </Link>
                ) : (
                  <p>Unknown author</p>
                )}
                <p>
                  <b>Current stock: </b>
                  {book.inStock === 0 ? <b>Out of stock</b> : book.inStock}
                </p>

                <p>Price: ${book.price / 100}</p>

                {this.props.user && this.props.user.isAdmin === true ? (
                  <button
                    onClick={() => this.handleDelete(book.id)}
                    type="button"
                    className="remove_button"
                  >
                    Remove Book
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
          ))
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  books: state.books,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getAllBooks: () => dispatch(getAllBooksThunk()),
  deleteBook: id => dispatch(deleteBook(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks)
