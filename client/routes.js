import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import FormBuilder from './components/FormBuilder/FormBuilder'
import ManageForms from './components/ManageForms'
import ApplicantHome from './components/ApplicantHome'
import Application from './components/Application'
import ReviewPage from './components/ReviewPage'
import ReviewApplicant from './components/ReviewApplicant'
import Success from './components/Success'
import {me} from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        <Route exact path="/" component={ApplicantHome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/application/:id" component={Application} />
        <Route path="/success/" exact component={Success} />

        {isLoggedIn && (
          <Switch>
            <Route path="/manage-forms" component={ManageForms} />
            <Route path="/create-form" component={FormBuilder} />
            <Route path="/review" exact component={ReviewPage} />
            <Route path="/review/:id" exact component={ReviewApplicant} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={ApplicantHome} />
      </Switch>
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
    isLoggedIn: !!state.user.id,
    userID: state.user.id
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
