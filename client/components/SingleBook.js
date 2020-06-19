import React from 'react'
import {connect} from 'react-redux'
import {getSingleBookThunk} from '../store/book'
import {Link} from 'react-router-dom'
import axios from 'axios'

class SingleBook extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getSingleBook(this.props.match.params.id)
  }
  handleClick(id) {
    axios.put('../api/orders', {bookId: id})
  }
  render() {
    const singleBook = this.props.singleBook
    console.log(singleBook)
    if (singleBook.id) {
      return (
        <div className="books-container">
          <div className="book-container" key={singleBook.id}>
            <div className="book-container-left">
              <img src={singleBook.image} />
            </div>
            <div className="book-container-right">
              <h3>{singleBook.name}</h3>
              <Link to={`/authors/${singleBook.authorId}`}>
                <h4>{singleBook.author.name}</h4>
              </Link>
              <p>
                <b>Description:</b> {singleBook.description}
              </p>
              <p>
                <b>Price:</b> ${singleBook.price / 100}
              </p>
              <p>
                <b>Current Quantity:</b> {singleBook.quantity}
              </p>
              <button
                onClick={() => this.handleClick(singleBook.id)}
                type="button"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )
    } else {
      return <div>Loading</div>
    }
  }
}

const mapStateToProps = state => ({
  singleBook: state.singleBook
})

const mapDispatchToProps = dispatch => ({
  getSingleBook: bookId => dispatch(getSingleBookThunk(bookId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook)
