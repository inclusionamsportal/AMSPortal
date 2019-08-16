import React from 'react'
import {Link} from 'react-router-dom'
import updateForm from '../api/forms/updateForm'
import deleteForm from '../api/forms/deleteForm'
import styled from 'styled-components'
import {lightGray, red, white, green, black} from '../shared/styles'
import {parseDate} from '../utils/date'
import FormUpdateTools from './FormUpdateTools'

const Container = styled.div`
  margin-bottom: 2rem;
  flex-basis: 30%;
  margin-right: 2rem;

  @media (max-width: 1040px) {
    flex-basis: 45%;
  }

  @media (max-width: 800px) {
    flex-basis: 60%;
  }
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${lightGray};
  border-radius: 5px;
  padding: 1rem 2rem;
  box-shadow: 0 10px 6px -6px ${lightGray};

  & h2 {
    margin-top: 0;
  }
`

const ApplyButton = styled(Link)`
  display: flex;
  padding: 0.5rem 1rem;
  color: ${black};
  border: 1px solid ${black};
  border-radius: 5px;
  margin-bottom: 0.4rem;
  font-size: 1rem;
  align-self: flex-start;

  &:hover {
    background-color: ${green};
    color: ${white};
    border-color: ${green};
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

const Deadline = styled.div`
  margin: 0.4rem 0 0.8rem 0;
`

const Title = styled.span`
  font-weight: 600;
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
  const dateObj = parseDate(deadline)

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
            <div>
              <Title>Deadline: </Title>
              <Deadline>
                <span>{dateObj.month}</span>
                <span>{` ${dateObj.date}`}</span>
                <span>{`, ${dateObj.year}`}</span>
              </Deadline>
            </div>
            <FormUpdateTools
              handleUpdate={handleUpdate}
              deadline={deadline}
              isActive={isActive}
            />
          </FormWrapper>
        </Container>
      ) : (
        <Container>
          <FormWrapper key={id}>
            <h2>{title}</h2>
            <div>
              <Title>Deadline: </Title>
              <Deadline>
                <span>{dateObj.month}</span>
                <span>{` ${dateObj.date}`}</span>
                <span>{`, ${dateObj.year}`}</span>
              </Deadline>
            </div>
            <ApplyButton to={`/application/${id}`}>Apply</ApplyButton>
          </FormWrapper>
        </Container>
      )}
    </React.Fragment>
  )
}

export default Form
