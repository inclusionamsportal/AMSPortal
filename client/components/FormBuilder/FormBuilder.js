import React, {Component} from 'react'
import BuildPanel from './BuildPanel'
import DraggableField from './DraggableField'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import isRequiredField from '../../utils/isRequiredField'
import reorderList from '../../utils/reorderList'
import getType from '../../utils/getType'
import styled from 'styled-components'
import {red} from '../../shared/styles'

const initialFieldsState = [
  {
    id: 'name',
    name: 'applicantName',
    label: 'Name',
    type: 'text'
  },
  {
    id: 'email',
    name: 'applicantEmail',
    label: 'Email',
    type: 'email'
  },
  {
    id: 'body',
    name: 'applicantBody',
    label: 'Body',
    type: 'textarea'
  }
]

const Container = styled.section`
  display: flex;
`

const Form = styled.form`
  margin: 2rem;
  display: flex;
  flex-direction: column;
`

const FormContainer = styled.div`
  margin: 2rem;
  display: flex;
  width: 60%;
  flex-direction: column;
  height: 90vh;
`

const FormTitle = styled.h1`
  margin: 0;
  height: 50px;
`

const DeleteMessage = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10000;
  background-color: rgba(240, 240, 240, 0.8);
  color: ${red};
`

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : '#fff',
  padding: '1rem 2rem',
  borderRadius: '5px',
  border: '1px solid gray',
  margin: '0',
  width: '70%',
  overflowY: 'scroll',
  flexBasis: '100%'
})

class FormBuilder extends Component {
  state = {
    counter: 0,
    fields: [...initialFieldsState],
    formTitle: 'Form Title',
    editedFieldIndex: 0,
    showDeleteMessage: false
  }

  // Save index of field that is being edited.
  handleEditFieldClick = (event, index) => {
    event.preventDefault()
    this.setState({
      editedFieldIndex: index
    })
  }

  handleEditFieldChange = (event, editType) => {
    const {value} = event.target
    const {fields, editedFieldIndex} = this.state
    const updatedFields = Array.from(fields)
    const field = updatedFields[editedFieldIndex]

    if (editType === 'label') {
      field.label = value
    }
    if (editType === 'type') {
      field.type = value
      // Generates name field based on type and appends a number to it.
      field.name = `${field.type}${this.updateCounter()}`
    }

    this.setState({
      fields: updatedFields
    })
  }

  handleFormTitleChange = event => {
    const {value} = event.target
    this.setState({
      formTitle: value
    })
  }

  // !!! - TODO
  handleFormSave = () => {
    const {fields, formTitle} = this.state
    console.log(fields, formTitle)
    console.log(`saved!`)
    // make a POST request to the server to save form
    // when request is returned move to admin home page.
  }

  onDragUpdate = result => {
    const {destination, source, draggableId} = result

    if (source.droppableId === 'aside') return
    if (isRequiredField(draggableId)) return

    this.setState({
      showDeleteMessage: !destination || destination.droppableId === 'aside'
    })
  }

  onDragEnd = result => {
    const {fields} = this.state
    const {destination, source, draggableId} = result

    // If input is dragged outside of drop zone - delete
    if (!destination || destination.droppableId === 'aside') {
      // Not allowed to delete required input fields.
      if (isRequiredField(draggableId)) return

      this.deleteField(draggableId)
      return
    }

    // Source and destination drop zones are the same
    // just reorder the list.
    if (source.droppableId === destination.droppableId) {
      const updatedFields = reorderList(fields, source.index, destination.index)

      this.setState({
        fields: updatedFields
      })
      return
    }

    // Dragging input fields on to the form builder drop zone.
    if (
      source.droppableId === 'aside' &&
      destination.droppableId === 'formBuilder'
    ) {
      const counter = this.updateCounter()
      const newField = {
        id: counter,
        label: getType(draggableId),
        type: `${draggableId}`,
        // Generates name field based on type and appends a number to it.
        name: `${draggableId}${counter}`
      }
      const updatedFields = Array.from(fields)
      updatedFields.splice(destination.index, 0, newField)

      this.setState({
        fields: updatedFields
      })
    }
  }

  deleteField = fieldID => {
    const newState = [...this.state.fields]
    const filteredState = newState.filter(item => item.id !== fieldID)

    this.setState({
      fields: filteredState,
      showDeleteMessage: false,
      editedFieldIndex: 0
    })
  }

  updateCounter = () => {
    const {counter} = this.state
    const newCounter = counter + 1
    this.setState({counter: newCounter})
    return newCounter
  }

  renderFormView = (field, index) => {
    let view

    switch (field.type) {
      case 'text':
      case 'email':
        view = (
          <DraggableField
            draggableId={field.id}
            index={index}
            label={field.label}
            key={field.id}
            name={field.name}
            type="text"
            handleEditFieldClick={this.handleEditFieldClick}
            handleDeleteField={this.deleteField}
          />
        )
        break
      case 'textarea':
        view = (
          <DraggableField
            draggableId={field.id}
            index={index}
            label={field.label}
            key={field.id}
            name={field.name}
            type="textarea"
            handleEditFieldClick={this.handleEditFieldClick}
            handleDeleteField={this.deleteField}
          />
        )
        break
      case 'checkbox':
        view = (
          <DraggableField
            draggableId={field.id}
            index={index}
            label={field.label}
            key={field.id}
            name={field.name}
            type="checkbox"
            handleEditFieldClick={this.handleEditFieldClick}
            handleDeleteField={this.deleteField}
          />
        )
        break
      case 'date':
        view = (
          <DraggableField
            draggableId={field.id}
            index={index}
            label={field.label}
            key={field.id}
            name={field.name}
            type="date"
            handleEditFieldClick={this.handleEditFieldClick}
            handleDeleteField={this.deleteField}
          />
        )
        break
      default:
        break
    }

    return view
  }

  render() {
    const {formTitle, editedFieldIndex, fields, showDeleteMessage} = this.state

    return (
      <Container>
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragUpdate={this.onDragUpdate}
        >
          <BuildPanel
            handleFormSave={this.handleFormSave}
            handleEditFieldChange={this.handleEditFieldChange}
            handleFormTitleChange={this.handleFormTitleChange}
            formTitle={formTitle}
            currentlyEditedField={fields[editedFieldIndex]}
            handleFormTypeChange={this.handleFormTypeChange}
          />
          <FormContainer>
            <FormTitle>{formTitle}</FormTitle>
            <Droppable droppableId="formBuilder">
              {(provided, snapshot) => (
                <Form
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {fields.map((item, index) =>
                    this.renderFormView(item, index)
                  )}
                  {provided.placeholder}
                </Form>
              )}
            </Droppable>
          </FormContainer>
          {showDeleteMessage && (
            <DeleteMessage>
              <h2>Delete Field</h2>

              <svg
                height="40px"
                viewBox="-40 0 427 427.00131"
                width="40px"
                xmlns="http://www.w3.org/2000/svg"
                fill={red}
              >
                <path d="m232.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                <path d="m114.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
                <path d="m28.398438 127.121094v246.378906c0 14.5625 5.339843 28.238281 14.667968 38.050781 9.285156 9.839844 22.207032 15.425781 35.730469 15.449219h189.203125c13.527344-.023438 26.449219-5.609375 35.730469-15.449219 9.328125-9.8125 14.667969-23.488281 14.667969-38.050781v-246.378906c18.542968-4.921875 30.558593-22.835938 28.078124-41.863282-2.484374-19.023437-18.691406-33.253906-37.878906-33.257812h-51.199218v-12.5c.058593-10.511719-4.097657-20.605469-11.539063-28.03125-7.441406-7.421875-17.550781-11.5546875-28.0625-11.46875h-88.796875c-10.511719-.0859375-20.621094 4.046875-28.0625 11.46875-7.441406 7.425781-11.597656 17.519531-11.539062 28.03125v12.5h-51.199219c-19.1875.003906-35.394531 14.234375-37.878907 33.257812-2.480468 19.027344 9.535157 36.941407 28.078126 41.863282zm239.601562 279.878906h-189.203125c-17.097656 0-30.398437-14.6875-30.398437-33.5v-245.5h250v245.5c0 18.8125-13.300782 33.5-30.398438 33.5zm-158.601562-367.5c-.066407-5.207031 1.980468-10.21875 5.675781-13.894531 3.691406-3.675781 8.714843-5.695313 13.925781-5.605469h88.796875c5.210937-.089844 10.234375 1.929688 13.925781 5.605469 3.695313 3.671875 5.742188 8.6875 5.675782 13.894531v12.5h-128zm-71.199219 32.5h270.398437c9.941406 0 18 8.058594 18 18s-8.058594 18-18 18h-270.398437c-9.941407 0-18-8.058594-18-18s8.058593-18 18-18zm0 0" />
                <path d="m173.398438 154.703125c-5.523438 0-10 4.476563-10 10v189c0 5.519531 4.476562 10 10 10 5.523437 0 10-4.480469 10-10v-189c0-5.523437-4.476563-10-10-10zm0 0" />
              </svg>
            </DeleteMessage>
          )}
        </DragDropContext>
      </Container>
    )
  }
}

export default FormBuilder
