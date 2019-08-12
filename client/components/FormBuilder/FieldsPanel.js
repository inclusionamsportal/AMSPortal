import React from 'react';
import Input from './DraggableField';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { SectionHeading } from '../../shared/styles';

const Panel = styled.div`
  padding: 0 1.4rem;
  height: 280px;
`;

const FieldsPanel = () => {
  return (
    <Panel>
      <SectionHeading>Fields</SectionHeading>
      <Droppable droppableId="aside">
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Input
              draggableId="textarea"
              index={0}
              type="textarea"
              label="Text Area"
              asideView={true}
            />
            <Input
              draggableId="checkbox"
              index={1}
              type="checkbox"
              label="Check Box"
              asideView={true}
            />
            <Input
              draggableId="text"
              index={2}
              type="text"
              label="Text Field"
              asideView={true}
            />
            <Input
              draggableId="date"
              index={3}
              type="date"
              label="Date"
              asideView={true}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Panel>
  );
};

export default FieldsPanel;
