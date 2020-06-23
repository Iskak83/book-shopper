import React from 'react'
import {connect} from 'react-redux'
import {getAllUsersThunk} from '../store/users'
import {Link} from 'react-router-dom'

class AllUsers extends React.Component {
  constructor() {
    super()
    this.state = {
      // quantity:
    }
  }

  componentDidMount() {
    this.props.getAllUsers()
  }
  handleDelete(id) {
    this.props.deleteUser(id)
  }
  render() {
    const users = this.props.users
    if (this.props.user.isAdmin) {
      return (
        <div className="books-container">
          {users === undefined || !users.length ? (
            <h3>Loading...</h3>
          ) : (
            <div>
              {users.map(user => (
                <div className="book-container" key={user.id}>
                  <div className="book-container-left">
                    <p>User's email: {user.email}</p>
                  </div>
                  <div className="book-container-right">
                    {user.isAdmin ? (
                      <p>This user is an Admin</p>
                    ) : (
                      <p>This user is not an Admin</p>
                    )}
                    <button
                      onClick={() => this.handleDelete(user.id)}
                      type="button"
                      className="remove_button"
                    >
                      Remove user
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )
    } else {
      return <div>You do not have permission!</div>
    }
  }
}

const mapStateToProps = state => ({
  users: state.users,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getAllUsers: () => dispatch(getAllUsersThunk()),
  deleteUser: id => dispatch(deleteUserThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
