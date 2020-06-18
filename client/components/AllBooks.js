import React from 'react'
import {connect} from 'react-redux'
import {getAllBooksThunk} from '../store/books'
import {Link} from 'react-router-dom'

class AllBooks extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getAllBooks()
  }

  render() {
    const books = this.props.books

    return (
      <div className="books-container">
        {books === undefined || !books.length ? (
          <h3>There are no books</h3>
        ) : (
          books.map(book => (
            <div className="book-container" key={book.id}>
              <div className="book-container-left">
                <img src={book.image} />
              </div>
              <div className="book-container-right">
                <h3>
                  <Link to={`/books/${book.id}`}>{book.name}</Link>
                </h3>
                <h4>{book.authorName}</h4>
                <p>
                  <b>Price:</b> ${book.price}
                </p>
                <button>Add to Cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  books: state.books
})

const mapDispatchToProps = dispatch => ({
  getAllBooks: () => dispatch(getAllBooksThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks)