import React, {Component} from 'react'
import Field from './Field'
import styled from 'styled-components'
import {white, green, greenHover, lightGray, black, red} from '../shared/styles'

const mockInputFields = {
  formTitle: 'Inclusion Application',
  data: [
    {
      id: 'name',
      label: 'Name',
      name: 'applicantName',
      type: 'text'
    },
    {
      id: 'email',
      label: 'Email',
      name: 'applicantEmail',
      type: 'email'
    },
    {
      id: 'body',
      label: 'Body',
      name: 'applicantBody',
      type: 'textarea'
    },
    {
      id: 2,
      label: 'Dude',
      name: 'textarea2',
      type: 'textarea'
    },
    {
      id: 1,
      label: 'Date',
      name: 'date1',
      type: 'date'
    }
  ]
}

const Container = styled.section`
  display: flex;
`

const Form = styled.form`
  width: 100%;
  padding: 2rem;
  border: 1px solid;
  border-radius: 5px;
`

const FormContainer = styled.div`
  margin: 2rem;
  display: flex;
  width: 60%;
  flex-direction: column;
`

const FormTitle = styled.h1`
  font-size: 2rem;
  color: ${black};
  margin: 0.5rem 0;
`

const Button = styled.button`
  font-size: 1rem;
  padding: 1rem;
  border: 1px solid ${green};
  border-radius: 5px;
  width: 40%;
  margin-top: 2rem;
  background-color: ${green};
  color: ${white};

  &:hover {
    background-color: ${greenHover};
    border-color: ${greenHover};
  }

  &:disabled {
    border-color: ${lightGray};
    background-color: ${lightGray};
    color: gray;
  }
`

const ErrorMessage = styled.p`
  color: ${red};
`

class Application extends Component {
  state = {
    formTitle: '',
    data: [],
    fields: {},
    error: false
  }

  // !!! TODO
  componentDidMount() {
    // console.log(id)
    // get the form with the associated id
    // update state with the data
    const {id} = this.props.match.params

    this.setState({
      formTitle: mockInputFields.formTitle,
      data: mockInputFields.data
    })
  }

  handleChange = event => {
    const {fields} = this.state
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    fields[name] = value

    const newFields = Object.assign({}, fields)
    newFields[name] = value

    this.setState({
      fields: newFields
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const {fields} = this.state

    this.setState({
      error: false
    })

    if (this.onValidForm()) {
      this.handleError()
      return
    }

    console.log(fields)
  }

  handleError = () => {
    this.setState({
      error: true
    })
  }

  renderFormView = (field, index) => {
    let view

    switch (field.type) {
      case 'text':
      case 'email':
        view = (
          <Field
            draggableId={field.id}
            index={index}
            label={field.label}
            key={field.id}
            name={field.name}
            type="text"
            handleChange={this.handleChange}
          />
        )
        break
      case 'textarea':
        view = (
          <Field
            draggableId={field.id}
            index={index}
            label={field.label}
            key={field.id}
            name={field.name}
            type="textarea"
            handleChange={this.handleChange}
          />
        )
        break
      case 'checkbox':
        view = (
          <Field
            draggableId={field.id}
            index={index}
            label={field.label}
            key={field.id}
            name={field.name}
            type="checkbox"
            handleChange={this.handleChange}
          />
        )
        break
      case 'date':
        view = (
          <Field
            draggableId={field.id}
            index={index}
            label={field.label}
            key={field.id}
            name={field.name}
            type="date"
            handleChange={this.handleChange}
          />
        )
        break
      default:
        break
    }

    return view
  }

  onValidForm = () => {
    const {fields, data} = this.state
    const inputFieldValues = Object.values(fields)
    const emptyField = ''
    let invalidForm = false

    if (inputFieldValues.length !== data.length) return true

    for (let i = 0; i < inputFieldValues.length; i += 1) {
      if (inputFieldValues[i] === emptyField) {
        invalidForm = true
        return invalidForm
      }
    }

    return invalidForm
  }

  render() {
    const {formTitle, data, error} = this.state

    return (
      <Container>
        <FormContainer>
          <FormTitle>{formTitle}</FormTitle>

          <Form onSubmit={this.handleSubmit}>
            {data.map((item, index) => this.renderFormView(item, index))}
            {error && (
              <ErrorMessage>
                Please fill out all the fields before submitting your
                application.
              </ErrorMessage>
            )}
            <Button type="submit" disabled={this.onValidForm()}>
              Submit
            </Button>
          </Form>
        </FormContainer>
      </Container>
    )
  }
}

export default Application
