import React from 'react'
import isRequiredField from '../../utils/isRequiredField'
import {SectionHeading} from '../../shared/styles'
import styled from 'styled-components'

const TypeChangeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;
`

const TypeChangeItem = styled.label`
  flex-basis: 45%;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
`

const EditInput = styled.input`
  border: 1px solid gray;
  border-radius: 5px;
  padding-left: 5px;
  height: 2rem;
`

const Title = styled.span`
  width: 50px;
  display: inline-block;
  margin-bottom: 0.4rem;
`

const TitleTwo = styled.span`
  display: inline-block;
  margin-bottom: 0.4rem;
`

const Section = styled.div`
  margin: 0.4rem 0;
`

const Panel = styled.div`
  padding: 0 1.4rem;

  & p {
    margin-bottom: 0.5rem;
    font-size: 0.8rem;
  }
`

const EditPanel = props => {
  const {
    formTitle,
    handleEditFieldChange,
    currentlyEditedField,
    handleFormTitleChange
  } = props

  return (
    <Panel>
      <SectionHeading>Edit Form</SectionHeading>

      <Section>
        <Title>Title:</Title>
        <EditInput
          type="text"
          name="formTitle"
          id="formTitle"
          onChange={handleFormTitleChange}
          value={formTitle}
        />
      </Section>

      <React.Fragment>
        <Section>
          <Title>Label:</Title>
          <EditInput
            type="text"
            onChange={event => handleEditFieldChange(event, 'label')}
            value={currentlyEditedField.label}
            name={currentlyEditedField.name}
          />
        </Section>

        <Section>
          <TitleTwo>Change Type:</TitleTwo>

          {!isRequiredField(currentlyEditedField.id) ? (
            <React.Fragment>
              <div>
                <TypeChangeContainer>
                  <TypeChangeItem>
                    Check Box{' '}
                    <input
                      type="radio"
                      value="checkbox"
                      name="edit"
                      checked={currentlyEditedField.type === 'checkbox'}
                      onChange={event => handleEditFieldChange(event, 'type')}
                    />
                  </TypeChangeItem>
                  <TypeChangeItem>
                    Text Area{' '}
                    <input
                      type="radio"
                      value="textarea"
                      name="edit"
                      checked={currentlyEditedField.type === 'textarea'}
                      onChange={event => handleEditFieldChange(event, 'type')}
                    />
                  </TypeChangeItem>
                  <TypeChangeItem>
                    Text Field{' '}
                    <input
                      type="radio"
                      value="text"
                      name="edit"
                      checked={currentlyEditedField.type === 'text'}
                      onChange={event => handleEditFieldChange(event, 'type')}
                    />
                  </TypeChangeItem>
                  <TypeChangeItem>
                    Date{' '}
                    <input
                      type="radio"
                      value="date"
                      name="edit"
                      checked={currentlyEditedField.type === 'date'}
                      onChange={event => handleEditFieldChange(event, 'type')}
                    />
                  </TypeChangeItem>
                </TypeChangeContainer>
              </div>
            </React.Fragment>
          ) : (
            <p>
              Only fields that are dragged on to the form are allowed to their
              field type changed.
            </p>
          )}
        </Section>
      </React.Fragment>
    </Panel>
  )
}

export default EditPanel
