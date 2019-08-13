import React, {Component} from 'react'
import {connect} from 'react-redux'
import Form from './Form'
import getForms from '../api/forms/getForms'
import styled from 'styled-components'

const Container = styled.section`
  margin: 0 auto;
  width: 90%;
`

const FormContainer = styled.section`
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
`

class ManageForms extends Component {
  state = {
    forms: []
  }

  componentDidMount() {
    const {userID} = this.props

    getForms()
      .then(response => {
        const {data} = response

        this.setState({
          forms: data
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    const {forms} = this.state

    const listOfForms = forms.map(form => {
      const {id, title, deadline, isActive} = form

      return (
        <Form
          key={id}
          id={id}
          isAdmin={true}
          title={title}
          deadline={deadline}
          isActive={isActive}
        />
      )
    })

    return (
      <Container>
        <h1>Manage Forms</h1>
        <FormContainer>{listOfForms}</FormContainer>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    userID: state.user.id
  }
}

export default connect(mapState)(ManageForms)
