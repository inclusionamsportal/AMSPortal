import React, {Component} from 'react'
import getForms from '../api/forms/getForms'
import styled from 'styled-components'
import Form from './Form'

const Container = styled.section`
  margin: 0 2rem;
`

const ApplicationContainer = styled.section`
  display: flex;
  justify-content: space-between;
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
        <h1>Open Applications</h1>
        <ApplicationContainer>{listOfForms}</ApplicationContainer>
      </Container>
    )
  }
}

export default ApplicantHome
