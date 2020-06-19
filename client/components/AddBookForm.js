import React from 'react'
import {connect} from 'react-redux'
import addBookThunk from '../store/books'

class AddBookForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      image: '',
      tag: '',
      price: 0,
      stock: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.addBook(this.state)
    this.setState({
      name: '',
      image: '',
      tag: '',
      price: 0,
      stock: 0
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">name: </label>
        <input
          name="name"
          type="text"
          onChange={this.handleChange}
          value={this.state.name}
        />

        <label htmlFor="image">image: </label>
        <input
          name="image"
          type="text"
          onChange={this.handleChange}
          value={this.state.image}
        />

        <label htmlFor="tag">tag: </label>
        <input
          name="tag"
          type="text"
          onChange={this.handleChange}
          value={this.state.tag}
        />

        <label htmlFor="price">price: </label>
        <input
          name="price"
          type="text"
          onChange={this.handleChange}
          value={this.state.price}
        />

        <label htmlFor="stock">stock: </label>
        <input
          name="stock"
          type="text"
          onChange={this.handleChange}
          value={this.state.stock}
        />

        <button type="submit">
          {/* disabled={!this.state.name || !this.state.price} */}
          Submit
        </button>
        {this.state.errorMessage && <div>{this.state.errorMessage}</div>}
      </form>
    )
  }
}

const mapStateTostate = state => ({
  books: state.books
})

const mapDispatchTostate = dispatch => ({
  getAllBooks: () => dispatch(addBookThunk()),
  addBook: body => dispatch(addBookThunk(body))
})

export default connect(mapStateTostate, mapDispatchTostate)(AddBookForm)
