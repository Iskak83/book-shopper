import React from 'react'
import {connect} from 'react-redux'
import {getSingleBookThunk} from '../store/book'
import Axios from 'axios'

class SingleBook extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getSingleBook(this.props.match.params.id)
  }
  handleClick(id) {
    Axios.put('../api/orders', {bookId: id})
  }
  render() {
    const singleBook = this.props.singleBook

    return (
      <div className="books-container">
        <div className="book-container" key={singleBook.id}>
          <div className="book-container-left">
            <img src={singleBook.image} />
          </div>
          <div className="book-container-right">
            <h3>{singleBook.name}</h3>
            <h4>{singleBook.authorName}</h4>
            <p>
              <b>Description:</b> {singleBook.description}
            </p>
            <p>
              <b>Price:</b> ${singleBook.price}
            </p>
            <p>
              <b>Current Quantity:</b> {singleBook.quantity}
            </p>
            <button
              type="button"
              onClick={() => {
                this.handleClick(singleBook.id)
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleBook: state.singleBook
})

const mapDispatchToProps = dispatch => ({
  getSingleBook: bookId => dispatch(getSingleBookThunk(bookId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook)
