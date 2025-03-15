
// // components/PublicForm.js
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import './PublicForm.css';
// import { AiOutlineCheckCircle, AiOutlineExclamationCircle } from "react-icons/ai";
// import { motion } from "framer-motion";

// const PublicForm = () => {
//   const { id } = useParams();
//   const savedForms = useSelector((state) => state.form.savedForms);
//   const form = savedForms.find((f) => f.id === parseInt(id));
//   const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm({ mode: "onSubmit" });

//   if (!form) {
//     return <div>Form not found.</div>;
//   }

//   const onSubmit = (data) => {
//     console.log('Public form data:', data);
//     alert('Form submitted!');
//   };

//   return (
//     <motion.div
//       className="public-form-container"
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h2>{form.name}</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="public-form">
//         {form.fields.map((field) => (
//           <motion.div key={field.id} className="public-field-container" whileHover={{ scale: 1.02 }}>
//             <label className="public-field-label">
//               {field.label} {field.required && <span className="required-star">*</span>}
//             </label>
//             <div className="public-input-wrapper">
//               {["text", "number", "email", "password", "date", "file"].includes(field.type) && (
//                 <div className="public-input-group">
//                   <input
//                     {...register(field.id, { required: field.required })}
//                     type={field.type}
//                     className={`public-input ${errors[field.id] ? "input-error" : "input-default"}`}
//                   />
//                   {errors[field.id] && isSubmitted ? (
//                     <AiOutlineExclamationCircle className="icon error-icon" />
//                   ) : (
//                     <AiOutlineCheckCircle className="icon success-icon" />
//                   )}
//                 </div>
//               )}
//               {field.type === 'textarea' && (
//                 <textarea
//                   {...register(field.id, { required: field.required })}
//                   className={`public-input public-textarea ${errors[field.id] ? "input-error" : "input-default"}`}
//                 />
//               )}
//               {field.type === 'checkbox' && (
//                 <div className="public-checkbox-container">
//                   {field.options && field.options.map((option, index) => (
//                     <label key={`${field.id}-${index}`} className="public-checkbox-label">
//                       <input {...register(field.id, { required: field.required })} type="checkbox" value={option} className="public-checkbox" />
//                       {option}
//                     </label>
//                   ))}
//                 </div>
//               )}
//               {field.type === 'radio' && (
//                 <div className="public-radio-container">
//                   {field.options && field.options.map((option, index) => (
//                     <label key={`${field.id}-${index}`} className="public-radio-label">
//                       <input {...register(field.id, { required: field.required })} type="radio" value={option} className="public-radio" />
//                       {option}
//                     </label>
//                   ))}
//                 </div>
//               )}
//               {field.type === 'dropdown' && (
//                 <select {...register(field.id, { required: field.required })} className="public-select">
//                   {field.options && field.options.map((option, index) => (
//                     <option key={`${field.id}-${index}`} value={option}>{option}</option>
//                   ))}
//                 </select>
//               )}
//               {errors[field.id] && isSubmitted && (
//                 <p className="error-msg">This field is required</p>
//               )}
//             </div>
//           </motion.div>
//         ))}
//         <button type="submit" className="public-submit-btn">Submit</button>
//       </form>
//     </motion.div>
//   );
// };

// export default PublicForm;
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import Confetti from 'react-confetti';
// import { AiOutlineCheckCircle, AiOutlineExclamationCircle } from "react-icons/ai";
// import { motion } from "framer-motion";
// import './PublicForm.css';

// const PublicForm = () => {
//   const { id } = useParams();
//   const savedForms = useSelector((state) => state.form.savedForms);
//   const form = savedForms.find((f) => f.id === parseInt(id));

//   const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm({ mode: "onSubmit" });

//   const [showConfetti, setShowConfetti] = useState(false);
//   const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({ width: window.innerWidth, height: window.innerHeight });
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   if (!form) {
//     return <div>Form not found.</div>;
//   }

//   const onSubmit = (data) => {
//     console.log('Public form data:', data);
//     alert('Form submitted!');
//     setShowConfetti(true);
    
//     // Stop confetti after 10 seconds
//     setTimeout(() => setShowConfetti(false), 10000);
//   };

//   return (
//     <motion.div
//       className="public-form-container"
//       initial={{ opacity: 0, y: -50 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
      
//       <h2>{form.name}</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="public-form">
//         {form.fields.map((field) => (
//           <motion.div key={field.id} className="public-field-container" whileHover={{ scale: 1.02 }}>
//             <label className="public-field-label">
//               {field.label} {field.required && <span className="required-star">*</span>}
//             </label>
//             <div className="public-input-wrapper">
//               {["text", "number", "email", "password", "date", "file"].includes(field.type) && (
//                 <div className="public-input-group">
//                   <input
//                     {...register(field.id, { required: field.required })}
//                     type={field.type}
//                     className={`public-input ${errors[field.id] ? "input-error" : "input-default"}`}
//                   />
//                   {errors[field.id] && isSubmitted ? (
//                     <AiOutlineExclamationCircle className="icon error-icon" />
//                   ) : (
//                     <AiOutlineCheckCircle className="icon success-icon" />
//                   )}
//                 </div>
//               )}

//               {field.type === 'textarea' && (
//                 <textarea
//                   {...register(field.id, { required: field.required })}
//                   className={`public-input public-textarea ${errors[field.id] ? "input-error" : "input-default"}`}
//                 />
//               )}

//               {field.type === 'checkbox' && (
//                 <div className="public-checkbox-container">
//                   {field.options && field.options.map((option, index) => (
//                     <label key={`${field.id}-${index}`} className="public-checkbox-label">
//                       <input {...register(field.id, { required: field.required })} type="checkbox" value={option} className="public-checkbox" />
//                       {option}
//                     </label>
//                   ))}
//                 </div>
//               )}

//               {field.type === 'radio' && (
//                 <div className="public-radio-container">
//                   {field.options && field.options.map((option, index) => (
//                     <label key={`${field.id}-${index}`} className="public-radio-label">
//                       <input {...register(field.id, { required: field.required })} type="radio" value={option} className="public-radio" />
//                       {option}
//                     </label>
//                   ))}
//                 </div>
//               )}

//               {field.type === 'dropdown' && (
//                 <select {...register(field.id, { required: field.required })} className="public-select">
//                   {field.options && field.options.map((option, index) => (
//                     <option key={`${field.id}-${index}`} value={option}>{option}</option>
//                   ))}
//                 </select>
//               )}

//               {errors[field.id] && isSubmitted && (
//                 <p className="error-msg">This field is required</p>
//               )}
//             </div>
//           </motion.div>
//         ))}

//         <button type="submit" className="public-submit-btn">Submit</button>
//       </form>
//     </motion.div>
//   );
// };

// export default PublicForm;
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Confetti from 'react-confetti';
import { AiOutlineCheckCircle, AiOutlineExclamationCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import './PublicForm.css';

const PublicForm = () => {
  const { id } = useParams();
  const savedForms = useSelector((state) => state.form.savedForms);
  const form = savedForms.find((f) => f.id === parseInt(id));

  const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm({ mode: "onSubmit" });

  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!form) {
    return <div>Form not found.</div>;
  }

  const onSubmit = (data) => {
    console.log('Public form data:', data);
    alert('Form submitted!');
    setShowConfetti(true);
    setSubmitted(true); // Mark form as submitted

    // Stop confetti after 10 seconds
    setTimeout(() => setShowConfetti(false), 10000);
  };

  const handleResubmit = () => {
    setSubmitted(false);
  };

  return (
    <motion.div
      className="public-form-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}

      <h2>{form.name}</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="public-form">
        {form.fields.map((field) => (
          <motion.div key={field.id} className="public-field-container" whileHover={{ scale: 1.02 }}>
            <label className="public-field-label">
              {field.label} {field.required && <span className="required-star">*</span>}
            </label>
            <div className="public-input-wrapper">
              {["text", "number", "email", "password", "date", "file"].includes(field.type) && (
                <div className="public-input-group">
                  <input
                    {...register(field.id, { required: field.required })}
                    type={field.type}
                    className={`public-input ${errors[field.id] ? "input-error" : "input-default"}`}
                  />
                  {errors[field.id] && isSubmitted ? (
                    <AiOutlineExclamationCircle className="icon error-icon" />
                  ) : (
                    <AiOutlineCheckCircle className="icon success-icon" />
                  )}
                </div>
              )}

              {field.type === 'textarea' && (
                <textarea
                  {...register(field.id, { required: field.required })}
                  className={`public-input public-textarea ${errors[field.id] ? "input-error" : "input-default"}`}
                />
              )}

              {field.type === 'checkbox' && (
                <div className="public-checkbox-container">
                  {field.options && field.options.map((option, index) => (
                    <label key={`${field.id}-${index}`} className="public-checkbox-label">
                      <input {...register(field.id, { required: field.required })} type="checkbox" value={option} className="public-checkbox" />
                      {option}
                    </label>
                  ))}
                </div>
              )}

              {field.type === 'radio' && (
                <div className="public-radio-container">
                  {field.options && field.options.map((option, index) => (
                    <label key={`${field.id}-${index}`} className="public-radio-label">
                      <input {...register(field.id, { required: field.required })} type="radio" value={option} className="public-radio" />
                      {option}
                    </label>
                  ))}
                </div>
              )}

              {field.type === 'dropdown' && (
                <select {...register(field.id, { required: field.required })} className="public-select">
                  {field.options && field.options.map((option, index) => (
                    <option key={`${field.id}-${index}`} value={option}>{option}</option>
                  ))}
                </select>
              )}

              {errors[field.id] && isSubmitted && (
                <p className="error-msg">This field is required</p>
              )}
            </div>
          </motion.div>
        ))}

        {submitted ? (
          <button type="button" className="public-submit-btn" onClick={handleResubmit}>
            Submit Again
          </button>
        ) : (
          <button type="submit" className="public-submit-btn">
            Submit
          </button>
        )}
      </form>
    </motion.div>
  );
};

export default PublicForm;
