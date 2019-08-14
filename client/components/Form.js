import React from 'react'
import {Link} from 'react-router-dom'
import updateForm from '../api/forms/updateForm'
import deleteForm from '../api/forms/deleteForm'
import styled from 'styled-components'
import {lightGray, red, white} from '../shared/styles'
import {getReadableDate} from '../utils/date'
import FormUpdateTools from './FormUpdateTools'

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
  border: 1px solid ${lightGray};
  border-radius: 5px;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 6px -6px ${lightGray};

  & h2 {
    margin-top: 0;
  }
`

const DeleteButton = styled.button`
  display: flex;
  padding: 0.5rem 1rem;
  color: ${red};
  border: 1px solid ${red};
  border-radius: 5px;
  margin-bottom: 0.4rem;
  margin-left: auto;
  font-size: 1rem;

  &:hover {
    background-color: ${red};
    color: ${white};
  }
`

const ApplyText = styled.span`
  display: inline-block;
  margin-top: 1rem;
  align-self: flex-start;
`

const Form = ({id, title, deadline, isAdmin, isActive}) => {
  const date = getReadableDate(deadline)

  // !!! TODO
  function handleFormUpdate(data) {
    console.log('Updated:', id)
    updateForm(`/${id}`, data)
  }

  // !!! TODO
  function handleDelete() {
    console.log('Noooo, why would you delete me? :( ', id)
    deleteForm(`/${id}`)
  }

  return (
    <React.Fragment>
      {isAdmin ? (
        <div>
          <DeleteButton type="button" onClick={handleDelete}>
            Delete
          </DeleteButton>
          <FormWrapper key={id}>
            <h2>{title}</h2>
            <span>Deadline: </span>
            <span>{date}</span>
            <FormUpdateTools
              handleFormUpdate={handleFormUpdate}
              deadline={deadline}
              isActive={isActive}
            />
          </FormWrapper>
        </div>
      ) : (
        <FormWrapper key={id}>
          <h2>{title}</h2>
          <span>Deadline: </span>
          <span>{date}</span>
          <Link to={`/application/${id}`}>
            <ApplyText>Apply</ApplyText>
          </Link>
        </FormWrapper>
      )}
    </React.Fragment>
  )
}

export default Form
