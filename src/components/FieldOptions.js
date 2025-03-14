// FieldOptions.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateField } from '../store/formSlice';
import './FieldOptions.css';

const FieldOptions = ({ field }) => {
  const dispatch = useDispatch();

  const handleLabelChange = (e) => {
    dispatch(updateField({ id: field.id, newData: { label: e.target.value } }));
  };

  const handleRequiredChange = (e) => {
    dispatch(updateField({ id: field.id, newData: { required: e.target.checked } }));
  };

  const handleOptionsChange = (e, index) => {
    const newOptions = [...field.options];
    newOptions[index] = e.target.value;
    dispatch(updateField({ id: field.id, newData: { options: newOptions } }));
  };

  return (
    <div className="field-options">
      <label>Label: <input type="text" value={field.label} onChange={handleLabelChange} /></label>
      <label>Required: <input type="checkbox" checked={field.required} onChange={handleRequiredChange} /></label>
      {field.type === 'dropdown' && (
        <div>
          <label>Options:</label>
          {field.options.map((opt, index) => (
            <input key={index} type="text" value={opt} onChange={(e) => handleOptionsChange(e, index)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FieldOptions;