import React from 'react'
import FieldsPanel from './FieldsPanel'
import EditPanel from './EditPanel'
import styled from 'styled-components'
import {
  white,
  whiteSmoke,
  secondaryColor,
  secondaryColorHover
} from '../../shared/styles'

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  width: 30vw;
  height: 100vh;
  border-right: 1px solid ${whiteSmoke};
`

const Button = styled.button`
  border: 1px solid ${secondaryColor};
  border-radius: 10px;
  padding: 1rem;
  width: 100%;
  margin-bottom: 1rem;
  background-color: ${secondaryColor};
  color: ${white};
  font-size: 1.1rem;

  &:hover {
    background-color: ${secondaryColorHover};
    border: 1px solid ${secondaryColorHover};
  }
`

const Exit = styled.div`
  display: flex;
  border-bottom: 2px solid ${whiteSmoke};
  border-right: 1px solid ${whiteSmoke};
  padding: 1rem 1.4rem;
  font-size: 1.4rem;
  transition: all 0.2s ease-out;

  &:hover {
    transition: all 0.2s ease-out;
    background-color: ${secondaryColor};
    border-right-color: ${secondaryColor};
    border-bottom-color: ${secondaryColor};
    color: ${white};

    & svg {
      transition: all 0.2s ease-out;
      fill: white;
      transform: translateX(-10px);
    }
  }

  & svg {
    transition: all 0.2s ease-out;
  }
`

const ButtonWrapper = styled.div`
  margin-top: auto;
  padding: 0 1.4rem;
`

const BuildPanel = props => {
  const {
    handleFormSave,
    formTitle,
    handleEditFieldChange,
    currentlyEditedField,
    handleFormTitleChange
  } = props

  return (
    <Container>
      <Exit>
        <svg
          width="25px"
          height="25px"
          enableBackground="new 0 0 492 492"
          viewBox="0 0 492 492"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m198.608 246.104 184.056-184.064c5.068-5.056 7.856-11.816 7.856-19.024 0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12c-5.06-5.072-11.824-7.864-19.032-7.864s-13.964 2.792-19.028 7.864l-219.148 219.144c-5.084 5.08-7.868 11.868-7.848 19.084-.02 7.248 2.76 14.028 7.848 19.112l218.944 218.932c5.064 5.072 11.82 7.864 19.032 7.864 7.208 0 13.964-2.792 19.032-7.864l16.124-16.12c10.492-10.492 10.492-27.572 0-38.06z" />
        </svg>
        Exit Builder
      </Exit>

      <FieldsPanel />
      <EditPanel
        formTitle={formTitle}
        handleEditFieldChange={handleEditFieldChange}
        currentlyEditedField={currentlyEditedField}
        handleFormTitleChange={handleFormTitleChange}
      />
      <ButtonWrapper>
        <Button type="button" onClick={handleFormSave}>
          Save Form
        </Button>
      </ButtonWrapper>
    </Container>
  )
}

export default BuildPanel
