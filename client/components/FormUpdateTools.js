import React, {Component} from 'react'
import styled from 'styled-components'
import {white, green} from '../shared/styles'
import {formatDate} from '../utils/date'

const SetDeadline = styled.div`
  display: flex;
  flex-direction: column;

  & label {
    font-weight: 600;
  }
`

const SwitchContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.8rem;

  & label {
    font-weight: 600;
  }
`

const Switch = styled.label`
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;

  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  & span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  & span:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: ${white};
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  & input:checked + span {
    background-color: ${green};
  }

  & input:focus + span {
    box-shadow: 0 0 1px ${green};
  }

  & input:checked + span:before {
    transform: translateX(26px);
  }

  & span {
    border-radius: 34px;
  }

  & span:before {
    border-radius: 50%;
  }
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
    const {handleUpdate} = this.props
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState(
      {
        [name]: value
      },
      () => {
        handleUpdate(this.state)
      }
    )
  }

  handleClick = () => {
    const {handleUpdate} = this.props
    handleUpdate(this.state)
  }

  wasUpdated = () => {
    const {isActive, deadline} = this.props
    const {isActive: isActiveState, deadline: deadlineState} = this.state
    const formattedDeadline = formatDate(deadline)

    return isActive !== isActiveState || formattedDeadline !== deadlineState
  }

  render() {
    const {isActive, deadline} = this.state

    return (
      <React.Fragment>
        <SetDeadline>
          <label htmlFor="set-deadline">Set Deadline</label>
          <input
            type="date"
            name="deadline"
            id="set-deadline"
            value={deadline}
            onChange={this.handleChange}
          />
        </SetDeadline>

        <SwitchContainer>
          <label htmlFor="is-active">Active</label>
          <Switch>
            <input
              type="checkbox"
              name="isActive"
              id="is-active"
              onChange={this.handleChange}
              checked={isActive}
            />
            <span />
          </Switch>
        </SwitchContainer>
      </React.Fragment>
    )
  }
}

export default FormUpdateTools
