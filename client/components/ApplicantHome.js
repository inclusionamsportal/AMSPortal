import React, {Component} from 'react'
import getForms from '../api/forms/getForms'
import styled from 'styled-components'
import Form from './Form'
import {Container} from '../shared/styles'

const ApplicationContainer = styled.section`
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
`

class ApplicantHome extends Component {
  state = {
    forms: []
  }

  componentDidMount() {
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
    const emptyMessage =
      forms.length === 0
        ? 'There are no applications available at the moment.'
        : ''

    const listOfForms = forms.map(form => {
      const {id, title, deadline, isActive} = form

      return (
        <Form
          key={id}
          id={id}
          title={title}
          deadline={deadline}
          isActive={isActive}
        />
      )
    })

    return (
      <Container>
        <h1>Applications</h1>
        <p>{emptyMessage}</p>
        <ApplicationContainer>{listOfForms}</ApplicationContainer>
      </Container>
    )
  }
}

export default ApplicantHome
