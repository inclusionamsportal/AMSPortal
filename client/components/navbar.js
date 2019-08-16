import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import styled from 'styled-components'
import {Container, black} from '../shared/styles'

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`

const Logo = styled(Link)`
  color: ${black};
  font-size: 1.6rem;
  display: inline-block;
  margin-left: 0;
`

const Navbar = ({handleClick, isLoggedIn}) => (
  <Container>
    <Nav>
      <Logo to="/">AMS Portal</Logo>
      {isLoggedIn ? (
        <div>
          <Link to="/review">Review Applicants</Link>
          <Link to="/manage-forms">Manage Forms</Link>
          <Link to="/create-form">Create Form</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </Nav>
  </Container>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
