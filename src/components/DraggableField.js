import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { MdDragHandle } from 'react-icons/md';
import "./DraggableField.css";

const DraggableField = ({ field, index, onEdit, onRemove, isMissing }) => {
  return (
    <Draggable draggableId={field.id.toString()} index={index}>
      {(provided) => (
        <div
          className={`draggable-field ${isMissing ? 'missing' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps} 
        >
          <MdDragHandle className="drag-handle" />
          <span className="field-label">
            {field.label} ({field.type}) {field.required && <span className="required">*</span>}
          </span>
          <div className="actions">
            <FaEdit className="edit-btn" onClick={() => onEdit(field.id)} />
            <FaTrash className="delete-btn" onClick={() => onRemove(field.id)} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableField;
