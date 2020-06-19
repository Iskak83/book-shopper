import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, isAdmin} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      {isAdmin ? (
        <div>
          <p>Admin status: Admin</p>
          <Link to="/add-book">
            <button type="button">Add book</button>
          </Link>
        </div>
      ) : (
        <p>Admin status: User</p>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
