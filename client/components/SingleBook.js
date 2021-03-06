import React from 'react'
import {connect} from 'react-redux'
import {getSingleBookThunk} from '../store/book'
import {Link} from 'react-router-dom'
import {putBookInCart} from '../store/order'
import EditBookForm from './EditBookForm'
import {NotificationManager} from 'react-notifications'

class SingleBook extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getSingleBook(this.props.match.params.id)
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  async handleClick(id) {
    const orderReq = this.state
    orderReq.bookId = id
    await this.props.putBookInCart(orderReq)

    console.log('what we are looking for', this.props.order)
    if (this.props.order.filter(book => book.bookId === id).length) {
      NotificationManager.success(
        'You have added a new book!',
        'Successful!',
        2000
      )
    }
  }

  render() {
    const singleBook = this.props.singleBook
    const options = []

    for (let i = 1; i <= 10; i++) {
      options.push(i)
    }
    if (singleBook.id) {
      return (
        <div className="books-container">
          <div className="book-container" key={singleBook.id}>
            <div className="book-container-left">
              <img src={singleBook.image} />
            </div>
            <div className="book-container-right">
              <h3>{singleBook.name}</h3>
              {singleBook.author ? (
                <Link to={`/authors/${singleBook.authorId}`}>
                  <h4>Author: {singleBook.author.name}</h4>
                </Link>
              ) : (
                <p>Unknown Author</p>
              )}
              <p>
                <b>Description:</b> {singleBook.description}
              </p>
              <p>
                <b>Price:</b> ${singleBook.price / 100}
              </p>
              <p>
                <b>Current stock: </b>
                {singleBook.inStock === 0 ? (
                  <b>Out of stock</b>
                ) : (
                  singleBook.inStock
                )}
              </p>
              <div>
                Quantity:
                <select onChange={this.handleChange} name="quantity">
                  {options.map(num => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => this.handleClick(singleBook.id)}
                type="button"
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div>
            {this.props.user.isAdmin === true ? (
              <EditBookForm bookId={singleBook.id} />
            ) : (
              ''
            )}
          </div>
        </div>
      )
    } else {
      return <div>Loading</div>
    }
  }
}

const mapStateToProps = state => ({
  singleBook: state.singleBook,
  user: state.user,
  order: state.order
})

const mapDispatchToProps = dispatch => ({
  getSingleBook: bookId => dispatch(getSingleBookThunk(bookId)),
  putBookInCart: orderReq => dispatch(putBookInCart(orderReq))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook)
