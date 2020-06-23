import React from 'react'
import {connect} from 'react-redux'
import {updateBook} from '../store/book'

class EditBookForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      image: '',
      tag: '',
      price: 0,
      inStock: 0,
      author: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.updateBook(this.props.bookId, this.state)
    this.setState({
      name: '',
      image: '',
      tag: '',
      price: 0,
      inStock: 0,
      author: ''
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

        <label htmlFor="inStock">stock: </label>
        <input
          name="inStock"
          type="text"
          onChange={this.handleChange}
          value={this.state.inStock}
        />

        <label htmlFor="author">Author: </label>
        <input
          name="author"
          type="text"
          onChange={this.handleChange}
          value={this.state.author}
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

const mapStateToProps = state => ({
  singleBook: state.singleBook
})

const mapDispatchToProps = dispatch => ({
  updateBook: (bookId, bookChanges) => dispatch(updateBook(bookId, bookChanges))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditBookForm)
