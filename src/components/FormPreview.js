import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle, AiOutlineExclamationCircle, AiOutlineCopy } from "react-icons/ai";
import { motion } from "framer-motion";
import "./FormPreview.css";
import { saveForm, publishForm } from '../store/formSlice';
import { useParams, useNavigate } from 'react-router-dom';

const FormPreview = () => {
  const fields = useSelector((state) => state.form.fields);
  const savedForms = useSelector((state) => state.form.savedForms);
  const dispatch = useDispatch();
  const { id } = useParams();
  const isViewingSavedForm = !!id;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm({ mode: "onSubmit" });

  const [formName, setFormName] = useState("");
  const [publishUrl, setPublishUrl] = useState(null);

  useEffect(() => {
    if (id) {
      const savedForm = savedForms.find((form) => form.id === parseInt(id));
      if (savedForm) {
        dispatch({ type: 'form/resetForm' });
        savedForm.fields.forEach((field) => {
          dispatch({ type: 'form/addField', payload: field });
        });
        setFormName(savedForm.name);
        setPublishUrl(`${window.location.origin}/public-form/${id}`);
      }
    } else {
      setPublishUrl(null);
    }
  }, [id, savedForms, dispatch]);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("🎉 Form submitted successfully!");
    reset();
  };

  const handleSaveForm = () => {
    if (formName.trim() === "") {
      alert("Please enter a form name.");
      return;
    }
    const newForm = {
      name: formName,
      fields: fields,
      id: Date.now(),
    };
    dispatch(saveForm(newForm));
    dispatch(publishForm(newForm.id));
    const generatedUrl = `${window.location.origin}/public-form/${newForm.id}`;
    setPublishUrl(generatedUrl);
    alert(`Form "${formName}" saved successfully! Publish URL: ${generatedUrl}`);
    setFormName("");
    navigate('/saved-forms');
  };

  const handleCopyUrl = () => {
    if (publishUrl) {
      navigator.clipboard.writeText(publishUrl);
      alert("URL copied to clipboard!");
    }
  };

  return (
    <motion.div
      className="preview-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="preview-header">
        <h1 className="preview-heading">Form Preview and Save</h1>
        {publishUrl && (
          <div className="publish-url-container">
            <span className="publish-url">{publishUrl}</span>
            <button className="copy-url-btn" onClick={handleCopyUrl}>
              <AiOutlineCopy />
            </button>
          </div>
        )}
      </div>
      <h2 className="preview-title">
        {isViewingSavedForm ? formName : "🚀 Form Preview"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="preview-form">
        {fields.map((field) => (
          <motion.div key={field.id} className="field-container" whileHover={{ scale: 1.02 }}>
            <label className="field-label">
              {field.label} {field.required && <span className="required-star">*</span>}
            </label>

            <div className="input-wrapper">
              {["text", "number", "email", "password", "date", "file"].includes(field.type) && (
                <div className="input-group">
                  <input
                    {...register(field.id, { required: field.required })}
                    type={field.type}
                    placeholder={`Enter ${field.type}...`}
                    className={`input ${errors[field.id] ? "input-error" : "input-default"}`}
                  />
                  {!isViewingSavedForm && (errors[field.id] && isSubmitted ? (
                    <AiOutlineExclamationCircle className="icon error-icon" />
                  ) : (
                    <AiOutlineCheckCircle className="icon success-icon" />
                  ))}
                </div>
              )}

              {field.type === "textarea" && (
                <textarea
                  {...register(field.id, { required: field.required })}
                  placeholder="Enter text..."
                  className={`input textarea ${errors[field.id] ? "input-error" : "input-default"}`}
                />
              )}

              {field.type === "checkbox" &&
                field.options?.map((option, index) => (
                  <div key={`${field.id}-${index}`} className="option-group">
                    <label className="option-label">
                      <input
                        {...register(field.id, { required: field.required })}
                        type="checkbox"
                        value={option}
                        className="checkbox"
                      />
                      {option}
                    </label>
                  </div>
                ))}

              {field.type === "radio" &&
                field.options?.map((option, index) => (
                  <div key={`${field.id}-${index}`} className="option-group">
                    <label className="option-label">
                      <input
                        {...register(field.id, { required: field.required })}
                        type="radio"
                        value={option}
                        className="radio"
                      />
                      {option}
                    </label>
                  </div>
                ))}

              {field.type === "dropdown" && (
                <select {...register(field.id, { required: field.required })} className="input select">
                  <option value="">Select an option</option>
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option}>{option}</option>
                  ))}
                </select>
              )}

              {!isViewingSavedForm && errors[field.id] && isSubmitted && (
                <p className="error-msg">This field is required</p>
              )}
            </div>
          </motion.div>
        ))}

        {!isViewingSavedForm && (
          <motion.button type="submit" className="submit-btn" whileTap={{ scale: 0.95 }}>
            Submit
          </motion.button>
        )}
      </form>
      <div className="save-form-section">
        <input
          type="text"
          placeholder="Enter Form Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          className="form-name-input"
        />
        <motion.button
          onClick={handleSaveForm}
          className="save-form-btn"
          whileTap={{ scale: 0.95 }}
        >
          Save Form
        </motion.button>
        <button onClick={() => navigate('/saved-forms')} className="saved-forms-btn">
          Saved Forms
        </button>
      </div>
    </motion.div>
  );
};

export default FormPreview;

