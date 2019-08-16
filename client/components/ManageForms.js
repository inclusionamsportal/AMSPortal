import React, {Component} from 'react'
import {connect} from 'react-redux'
import Form from './Form'
import {Link} from 'react-router-dom'
import getForms from '../api/forms/getForms'
import {Container} from '../shared/styles'
import styled from 'styled-components'

const FormContainer = styled.section`
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
`

class ManageForms extends Component {
  state = {
    forms: []
  }

  componentDidMount() {
    const {userID} = this.props

    getForms(`${userID}`)
      .then(response => {
        const {data} = response
        const forms = data.map(form => {
          form.updated = false
          return form
        })

        this.setState({
          forms
        })
      })
      .catch(error => console.log(error))
  }

  handleDeleteForm = index => {
    const {forms} = this.state
    const filteredForms = forms.filter((form, idx) => index !== idx)

    this.setState({
      forms: filteredForms
    })
  }

  handleFormUpdate = (data, index) => {
    const {forms} = this.state
    const updatedForms = forms.map((form, idx) => {
      if (index === idx) {
        form.deadline = data.deadline
        form.isActive = data.isActive
        form.updated = true
        return form
      }
      form.updated = false
      return form
    })

    this.setState({
      forms: updatedForms
    })
  }

  render() {
    const {forms} = this.state

    const listOfForms = forms.map((form, index) => {
      const {id, title, deadline, isActive, updated} = form

      return (
        <Form
          key={id}
          id={id}
          isAdmin={true}
          title={title}
          deadline={deadline}
          isActive={isActive}
          index={index}
          updated={updated}
          handleDeleteForm={this.handleDeleteForm}
          handleFormUpdate={this.handleFormUpdate}
        />
      )
    })

    return (
      <Container>
        <h1>Manage Forms</h1>
        {forms.length === 0 && (
          <div>
            <Link to="/create-form"> Create a form</Link> to get started!
          </div>
        )}
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
