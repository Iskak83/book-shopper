import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import AllBooks from './components/AllBooks'
import SingleBook from './components/SingleBook'
import AllAuthors from './components/AllAuthors'
import SingleAuthor from './components/SingleAuthor'
import AddBookForm from './components/AddBookForm'
import Checkout from './components/Checkout'
import AllUsers from './components/AllUsers'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {/* <AllBooks /> */}
          {/* <Route exact path="/" component={AllBooks} /> */}
          <Route exact path="/books" component={AllBooks} />
          <Route exact path="/add-book" component={AddBookForm} />
          <Route exact path="/books/:id" component={SingleBook} />
          <Route exact path="/authors" component={AllAuthors} />
          <Route exact path="/authors/:id" component={SingleAuthor} />
          {/* <Route exact path="/orders" component={Checkout} /> */}
          <Route exact path="/users" component={AllUsers} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route exact path="/orders" component={Checkout} />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
        </Switch>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
