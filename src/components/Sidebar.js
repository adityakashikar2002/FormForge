// Sidebar.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { addField } from '../store/formSlice';
import { v4 as uuidv4 } from 'uuid';
import { FaFont, FaHashtag, FaEnvelope, FaLock, FaParagraph, FaList, FaCheckSquare, FaDotCircle, FaCalendar, FaUpload } from 'react-icons/fa';
import { AiOutlinePlus} from 'react-icons/ai';
import './Sidebar.css';

const Sidebar = () => {
  const dispatch = useDispatch();

  const addNewField = (type, label, options = []) => {
    dispatch(addField({
      id: uuidv4(),
      label,
      type,
      required: false,
      options,
    }));
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title"><AiOutlinePlus size={18} /> Add Field</h3>
      <button className="sidebar-btn" onClick={() => addNewField('text', 'New Text Field')}>
        <FaFont className="icon" /> Text Field
      </button>
      <button className="sidebar-btn" onClick={() => addNewField('number', 'New Number Field')}>
        <FaHashtag className="icon" /> Number Field
      </button>
      <button className="sidebar-btn" onClick={() => addNewField('email', 'New Email Field')}>
        <FaEnvelope className="icon" /> Email Field
      </button>
      <button className="sidebar-btn" onClick={() => addNewField('password', 'New Password Field')}>
        <FaLock className="icon" /> Password Field
      </button>
      <button className="sidebar-btn" onClick={() => addNewField('textarea', 'New Textarea Field')}>
        <FaParagraph className="icon" /> Text Area
      </button>
      <button className="sidebar-btn" onClick={() => addNewField('dropdown', 'New Dropdown', ['Option 1', 'Option 2'])}>
        <FaList className="icon" /> Dropdown
      </button>
      <button className="sidebar-btn" onClick={() => addNewField('checkbox', 'New Checkbox Group')}>
        <FaCheckSquare className="icon" /> Checkbox Group
      </button>
      <button className="sidebar-btn" onClick={() => addNewField('radio', 'New Radio Group')}>
        <FaDotCircle className="icon" /> Radio Group
      </button>
      <button className="sidebar-btn" onClick={() => addNewField('date', 'New Date Picker')}>
        <FaCalendar className="icon" /> Date Picker
      </button>
      <button className="sidebar-btn" onClick={() => addNewField('file', 'New File Upload')}>
        <FaUpload className="icon" /> File Upload
      </button>
    </div>
  );
};

export default Sidebar;