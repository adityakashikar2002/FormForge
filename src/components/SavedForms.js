import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { deleteForm, loadForm } from '../store/formSlice';
import './SavedForms.css';
import { AiOutlineEdit,AiOutlineClose } from 'react-icons/ai'; // Import close icon

const SavedForms = () => {
  const savedForms = useSelector(state => state.form.savedForms);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const handleEdit = (formId) => {
    dispatch(loadForm(formId));
    navigate('/');
  };

  const handleDelete = (formId) => {
    dispatch(deleteForm(formId));
  };

  return (
    <div className="saved-forms-container">
      <h2>Saved Forms</h2>
      {savedForms.length === 0 ? (
        <p>No saved forms yet.</p>
      ) : (
        <div className="saved-forms-grid">
          {savedForms.map(form => (
            <motion.div
              key={form.id}
              className="saved-form-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card-header">
                {/* <AiOutlineClipboard /> */}
                <span>{form.name}</span>
              </div>
              <div className="card-body">
                <span className="form-date">Saved on: {formatDate(form.id)}</span>
                <div className="form-actions">
                  <button className="edit-form-btn" onClick={() => handleEdit(form.id)}>
                    <AiOutlineEdit /> Edit
                  </button>
                  <button onClick={() => navigate(`/preview/${form.id}`)} className="view-form-btn">View</button>
                </div>
              </div>
              <div className="delete-icon" onClick={() => handleDelete(form.id)}>
                <AiOutlineClose />
              </div>
              {/* <div className="form-info">
                <span className="form-name">{form.name}</span>
                <span className="form-date">Saved on: {formatDate(form.id)}</span>
              </div>
              <div className="form-actions">
                <button onClick={() => handleEdit(form.id)} className="edit-form-btn">Edit</button>
                <button onClick={() => navigate(`/preview/${form.id}`)} className="view-form-btn">View</button>
              </div> */}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedForms;