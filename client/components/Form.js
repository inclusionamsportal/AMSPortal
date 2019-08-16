import React from 'react'
import {Link} from 'react-router-dom'
import updateForm from '../api/forms/updateForm'
import deleteForm from '../api/forms/deleteForm'
import styled from 'styled-components'
import {lightGray, red, white, green} from '../shared/styles'
import {getReadableDate} from '../utils/date'
import FormUpdateTools from './FormUpdateTools'

const Container = styled.div`
  margin-bottom: 2rem;
  flex-basis: 30%;
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${lightGray};
  border-radius: 5px;
  padding: 1rem 2rem;
  box-shadow: 0 10px 6px -6px ${lightGray};

  ${({updated}) =>
    updated &&
    `
    border: 2px solid ${green};
  `} & h2 {
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

const UpdatedText = styled.p`
  text-align: center;
  font-weight: 600;
  color: ${green};
`

const Form = ({
  id,
  title,
  deadline,
  isAdmin,
  isActive,
  index,
  updated,
  handleDeleteForm,
  handleFormUpdate
}) => {
  const date = getReadableDate(deadline)

  function handleUpdate(data) {
    updateForm(`/${id}`, data)
      .then(response => {
        const {data: updatedData} = response
        handleFormUpdate(updatedData, index)
      })
      .catch(error => console.log(error))
  }

  function handleDelete() {
    deleteForm(`/${id}`)
      .then(() => {
        handleDeleteForm(index)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <React.Fragment>
      {isAdmin ? (
        <Container>
          <DeleteButton type="button" onClick={handleDelete}>
            Delete
          </DeleteButton>
          <FormWrapper key={id} updated={updated}>
            <h2>{title}</h2>
            <span>Deadline: </span>
            <span>{date}</span>
            <FormUpdateTools
              handleUpdate={handleUpdate}
              deadline={deadline}
              isActive={isActive}
            />
          </FormWrapper>
          {updated && <UpdatedText>Updated!</UpdatedText>}
        </Container>
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
