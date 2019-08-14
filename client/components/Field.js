import React, {Component} from 'react'
import styled from 'styled-components'
import {white} from '../shared/styles'

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
`

const InputField = styled.input`
  font-size: 1rem;
  border: 1px solid gray;
  border-radius: 5px;
  margin-top: 5px;
  padding: 1rem 0 1rem 0.3rem;
  height: 1.4rem;
  background-color: ${white};
  &[type='checkbox'] {
    height: 1rem;
    width: 1rem;
  }
`

const TextAreaField = styled.textarea`
  font-size: 1rem;
  border: 1px solid gray;
  border-radius: 5px;
  background-color: ${white};
  padding: 0.4rem 0 0.4rem 0.3rem;
  margin-top: 5px;
  max-width: 100%;
`

class Field extends Component {
  render() {
    const {label, name, type, handleChange} = this.props

    return (
      <Label>
        {label}
        {type === 'textarea' ? (
          <TextAreaField rows={6} name={name} onChange={handleChange} />
        ) : (
          <InputField type={type} name={name} onChange={handleChange} />
        )}
      </Label>
    )
  }
}

export default Field
