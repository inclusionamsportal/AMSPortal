import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import styled from 'styled-components'
import {Button, black} from '../shared/styles'
import LoginSVG from './svg/LoginSVG'

const Container = styled.div`
  margin: 0 4rem;
  display: flex;
  justify-content: center;
`

const Field = styled.div`
  margin: 2rem 0;
`

const Input = styled.input`
  display: block;
  margin-top: 0.4rem;
  font-size: 1.2rem;
  border: 1px solid ${black};
  border-radius: 5px;
  height: 40px;
  padding-left: 5px;
`

const SVGContainer = styled.div`
  width: 42%;
  margin-left: 1.4rem;
`

const FormContainer = styled.div``

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <Container>
      <FormContainer>
        <h1>{displayName}</h1>
        <form onSubmit={handleSubmit} name={name}>
          <Field>
            <label htmlFor="email">
              <small>Username</small>
            </label>
            <Input name="email" type="text" />
          </Field>
          <Field>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <Input name="password" type="password" />
          </Field>
          <div>
            <Button type="submit">{displayName}</Button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </FormContainer>
      <SVGContainer>
        <LoginSVG />
      </SVGContainer>
    </Container>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
