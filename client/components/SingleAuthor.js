import React from 'react'
import {connect} from 'react-redux'
import {getSingleAuthorThunk} from '../store/singleAuthor'
import {Link} from 'react-router-dom'

class SingleAuthor extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.getSingleAuthor(this.props.match.params.id)
  }

  render() {
    const singleAuthor = this.props.singleAuthor

    return (
      <div className="books-container">
        <div className="book-container" key={singleAuthor.id}>
          <div className="book-container-left">
            <img src={singleAuthor.image} />
          </div>
          <div className="book-container-right">
            <h3>{singleAuthor.name}</h3>
            <h4>{singleAuthor.bio}</h4>
          </div>
        </div>
        <h4>Author's Books</h4>
        <div>
          {singleAuthor.books && singleAuthor.books.length ? (
            singleAuthor.books.map(book => (
              <ul key={book.id}>
                <div>
                  {
                    <div className="book-container">
                      <div className="book-container-left">
                        <img src={book.image} />
                      </div>
                      <div className="book-container-right">
                        <Link to={`/books/${book.id}`}>
                          <h3>{book.name}</h3>
                        </Link>
                        <h3>{book.authorName}</h3>
                        <h3>Price: ${book.price / 100}</h3>
                      </div>
                    </div>
                  }
                </div>
              </ul>
            ))
          ) : (
            <h5>This author doesn't have any books listed yet</h5>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleAuthor: state.singleAuthor
})

const mapDispatchToProps = dispatch => ({
  getSingleAuthor: authorId => dispatch(getSingleAuthorThunk(authorId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleAuthor)
