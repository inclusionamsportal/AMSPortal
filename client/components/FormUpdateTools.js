import React, {Component} from 'react'
import styled from 'styled-components'
import {lightGray, white, green, greenHover} from '../shared/styles'
import {formatDate} from '../utils/date'

const Tools = styled.div`
  display: flex;
  margin-top: 1rem;
  flex-direction: column;
`

const Button = styled.button`
  width: 60%;
  padding: 1rem;
  border: 1px solid ${green};
  border-radius: 5px;
  margin-top: 1rem;
  background-color: ${green};
  color: ${white};
  font-size: 1rem;

  &:hover {
    background-color: ${greenHover};
    border-color: ${greenHover};
  }

  &:disabled {
    border: 1px solid ${lightGray};
    background-color: ${lightGray};
    color: gray;
  }
`

const Field = styled.label`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
`

class FormUpdateTools extends Component {
  state = {
    deadline: '',
    isActive: false
  }

  componentDidMount() {
    const {isActive, deadline} = this.props

    const date = formatDate(deadline)

    this.setState({
      deadline: date,
      isActive
    })
  }

  handleChange = event => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  handleClick = () => {
    const {handleFormUpdate} = this.props
    handleFormUpdate(this.state)
  }

  wasUpdated = () => {
    const {isActive, deadline} = this.props
    const {isActive: isActiveState, deadline: deadlineState} = this.state
    const parsedDeadline = formatDate(deadline)

    return isActive !== isActiveState || parsedDeadline !== deadlineState
  }

  render() {
    const {isActive, deadline} = this.state
    const formActivationText = isActive ? 'Deactivate Form' : 'Activate Form'

    return (
      <Tools>
        <Field>
          Set Deadline:<input
            type="date"
            name="deadline"
            value={deadline}
            onChange={this.handleChange}
          />
        </Field>

        <Field>
          {formActivationText}
          <input
            type="checkbox"
            name="isActive"
            onChange={this.handleChange}
            checked={isActive}
          />
        </Field>
        <Button
          type="button"
          onClick={this.handleClick}
          disabled={!this.wasUpdated()}
        >
          Update Form
        </Button>
      </Tools>
    )
  }
}

export default FormUpdateTools
