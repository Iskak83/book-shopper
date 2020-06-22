import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCart, putBookInCart, placedOrder} from '../store/order'
import axios from 'axios'

class CheckoutOrder extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getCart()
  }

  async handleChange(event) {
    console.log(event.target)
    await this.setState({[event.target.name]: event.target.value})
    console.log('quantity selected After', this.state)
  }

  handleClick(id) {
    const orderReq = {quantity: this.state[id]}
    orderReq.bookId = id
    this.props.putBookInCart(orderReq)
  }
  handleSubmit(subtotal, totQty) {
    const finalOrder = {
      totalPrice: subtotal,
      totalQuantity: totQty,
      isCheckedout: true
    }
    this.props.placedOrder(finalOrder)
    // axios.put('/api/orders/checkout', finalOrder)
  }
  render() {
    const order = this.props.order
    if (order[0]) {
      let subtotal = 0
      let totQty = 0
      order.forEach(bookOrder => {
        subtotal += bookOrder.savedPrice * bookOrder.bookQuantity
        totQty += bookOrder.bookQuantity
      })

      const options = []
      for (let i = 1; i <= 10; i++) {
        options.push(i)
      }
      return (
        <div className="books-container">
          <h1>Checkout</h1>
          <h3>Add these to your home collection!</h3>
          {order === undefined || !order.length ? (
            <h3>Loading...</h3>
          ) : (
            order.map(bookOrder => (
              <div className="book-container" key={bookOrder.book.id}>
                <div className="book-container-left">
                  <img src={bookOrder.book.image} />
                </div>
                <div className="book-container-right">
                  <Link to={`/books/${bookOrder.book.id}`}>
                    <p>{bookOrder.book.name}</p>
                  </Link>
                  <p>Price: ${bookOrder.book.price / 100}</p>
                  <div>
                    Quantity:
                    <select
                      defaultValue={bookOrder.bookQuantity}
                      onChange={this.handleChange}
                      name={bookOrder.bookId}
                    >
                      {options.map(num => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => this.handleClick(bookOrder.book.id)}
                    type="button"
                  >
                    Change Quantity
                  </button>
                </div>
              </div>
            ))
          )}

          <div> Checkout subtotal: ${subtotal / 100}</div>
          <div>Total Quantity: {totQty} </div>
          <button
            type="button"
            className="book-container-right"
            onClick={() => this.handleSubmit(subtotal, totQty)}
          >
            Checkout
          </button>
        </div>
      )
    } else {
      return (
        <div className="books-container">
          <h2> Your cart is empty</h2>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  order: state.order
})

const mapDispatchToProps = dispatch => ({
  getCart: () => dispatch(getCart()),
  putBookInCart: orderReq => dispatch(putBookInCart(orderReq)),
  placedOrder: finalOrder => dispatch(placedOrder(finalOrder))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutOrder)
