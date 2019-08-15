import React, {Component} from 'react'
import Field from './Field'
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'
import getForm from '../api/forms/getForm'
import createApplication from '../api/applications/createApplication'
import {white, green, greenHover, lightGray, black, red} from '../shared/styles'

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
    error: false,
    redirect: false
  }

  componentDidMount() {
    const {id} = this.props.match.params

    getForm(`/apply/${id}`)
      .then(response => {
        const {data} = response

        this.setState({
          formTitle: data.title,
          data: data.textBody
        })
      })
      .catch(error => console.log(error))
  }

  handleChange = (event, label, index) => {
    const {fields} = this.state
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const newFields = Array.from(fields)

    const newValue = {
      label,
      value,
      name
    }

    newFields[index] = newValue

    this.setState({
      fields: newFields
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const {fields} = this.state
    const {id} = this.props.match.params

    this.setState({
      error: false
    })

    if (this.onValidForm()) {
      this.handleError()
      return
    }

    const data = {
      applicantName: this.getApplicantInfo('applicantName'),
      applicantEmail: this.getApplicantInfo('applicantEmail'),
      applicationBody: fields,
      status: 'UNDER REVIEW',
      formId: id
    }
    createApplication(`/`, data)
      .then(() => {
        this.setState({
          redirect: true
        })
      })
      .catch(error => console.log(error))
  }

  getApplicantInfo = info => {
    const {fields} = this.state

    for (let i = 0; i < fields.length; i++) {
      if (fields[i].name === info) return fields[i].value
    }

    return ''
  }

  getApplicantEmail = () => {
    const {fields} = this.state
    const NOT_FOUND = -1

    for (let i = 0; i < fields.length; i++) {
      if (fields[i].email === 'applicantEmail') return fields[i].email
    }

    return NOT_FOUND
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
            type={field.type}
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
    const {formTitle, data, error, redirect} = this.state

    if (redirect) return <Redirect to="/success" />

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
