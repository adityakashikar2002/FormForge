import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeField, updateField, reorderFields, resetForm } from '../store/formSlice';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DraggableField from './DraggableField';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai';
import { motion } from 'framer-motion';
import './FormBuilder.css';

const FormBuilder = () => {
  const dispatch = useDispatch();
  const fields = useSelector(state => state.form.fields);
  const navigate = useNavigate();
  const [editingFieldId, setEditingFieldId] = useState(null);
  const [editedLabel, setEditedLabel] = useState('');
  const [editedOptions, setEditedOptions] = useState('');
  const [editedRequired, setEditedRequired] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedFields = Array.from(fields);
    const [movedItem] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, movedItem);

    dispatch(reorderFields([...reorderedFields]));
  };

  const handleEdit = (id) => {
    const field = fields.find(f => f.id === id);
    if (field) {
      setEditingFieldId(id);
      setEditedLabel(field.label);
      setEditedOptions(field.options ? field.options.join(', ') : '');
      setEditedRequired(field.required || false);
    }
  };

  const handleSaveEdit = () => {
    const newOptions = editedOptions ? editedOptions.split(',').map(opt => opt.trim()) : [];

    dispatch(updateField({
      id: editingFieldId,
      newData: {
        label: editedLabel,
        options: newOptions,
        required: editedRequired,
      },
    }));
    setEditingFieldId(null);
  };

  const handleCancelEdit = () => {
    setEditingFieldId(null);
  };

  return (
    <motion.div
      className="form-builder"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Build Your Form</h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="droppable-container">
              {fields.map((field, index) => (
                <div key={field.id}>
                  {editingFieldId === field.id ? (
                    <div className="edit-field-form">
                      <label>Label:</label>
                      <input
                        type="text"
                        value={editedLabel}
                        onChange={(e) => setEditedLabel(e.target.value)}
                      />
                      {['dropdown', 'radio', 'checkbox'].includes(field.type) && (
                        <>
                          <label>Options (comma separated):</label>
                          <textarea
                            value={editedOptions}
                            onChange={(e) => setEditedOptions(e.target.value)}
                          />
                        </>
                      )}
                      <div className="required-toggle">
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={editedRequired}
                            onChange={(e) => setEditedRequired(e.target.checked)}
                          />
                          <span className="slider round"></span>
                        </label>
                        <span>Required Field</span>
                      </div>
                      <div className="edit-buttons">
                        <button onClick={handleSaveEdit}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <DraggableField
                      field={field}
                      index={index}
                      onEdit={() => handleEdit(field.id)}
                      onRemove={() => dispatch(removeField(field.id))}
                    />
                  )}
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="buttons">
        <button onClick={() => navigate('/preview')} className="preview-btn">Preview Form</button>
        <button onClick={() => dispatch(resetForm())} className="reset-btn">
          <AiOutlineDelete size={16} /> Reset Form
        </button>
        <button onClick={() => navigate('/saved-forms')} className="saved-forms-btn">
          Saved Forms
        </button>
      </div>
    </motion.div>
  );
};

export default FormBuilder;