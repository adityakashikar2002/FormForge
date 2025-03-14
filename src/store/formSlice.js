// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   fields: [],
//   savedForms: [],
//   currentForm: {
//     id: 'default',
//     name: 'New Form',
//     fields: [],
//   },
// };

// const formSlice = createSlice({
//   name: 'form',
//   initialState,
//   reducers: {
//     addField: (state, action) => {
//       state.fields.push({ ...action.payload, value: '', required: action.payload.required || false });
//     },
//     removeField: (state, action) => {
//       state.fields = state.fields.filter(field => field.id !== action.payload);
//     },
//     updateField: (state, action) => {
//       const { id, newData } = action.payload;
//       const index = state.fields.findIndex(field => field.id === id);
//       if (index !== -1) {
//         state.fields[index] = { ...state.fields[index], ...newData };
//       }
//     },
//     reorderFields: (state, action) => {
//       state.fields = action.payload;
//     },
//     resetForm: (state) => {
//       state.fields = [];
//     },
//     saveForm: (state, action) => {
//       const newForm = {
//         name: action.payload.name,
//         fields: action.payload.fields,
//         id: Date.now(),
//       };
//       state.savedForms.push(newForm);
//       state.currentForm = newForm;
//     },
//     loadSavedForms: (state, action) => {
//       state.savedForms = action.payload;
//     },
//     loadForm: (state, action) => {
//       const form = state.savedForms.find(savedForm => savedForm.id === action.payload);
//       if (form) {
//         state.currentForm = { ...form };
//         state.fields = [...form.fields];
//       }
//     },
//     deleteForm: (state, action) => {
//       state.savedForms = state.savedForms.filter(savedForm => savedForm.id !== action.payload);
//       if(state.currentForm.id === action.payload) {
//         state.currentForm = {
//           id: 'default',
//           name: 'New Form',
//           fields: [],
//         };
//         state.fields = [];
//       }
//     },
//   },
// });

// export const {
//   addField,
//   removeField,
//   updateField,
//   reorderFields,
//   resetForm,
//   saveForm,
//   loadSavedForms,
//   loadForm, // Export loadForm
//   deleteForm, // Export deleteForm
// } = formSlice.actions;

// export default formSlice.reducer;

// store/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fields: [],
  savedForms: [],
  currentForm: {
    id: 'default',
    name: 'New Form',
    fields: [],
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addField: (state, action) => {
      state.fields.push({ ...action.payload, value: '', required: action.payload.required || false });
    },
    removeField: (state, action) => {
      state.fields = state.fields.filter(field => field.id !== action.payload);
    },
    updateField: (state, action) => {
      const { id, newData } = action.payload;
      const index = state.fields.findIndex(field => field.id === id);
      if (index !== -1) {
        state.fields[index] = { ...state.fields[index], ...newData };
      }
    },
    reorderFields: (state, action) => {
      state.fields = action.payload;
    },
    resetForm: (state) => {
      state.fields = [];
    },
    saveForm: (state, action) => {
      const newForm = {
        name: action.payload.name,
        fields: action.payload.fields,
        id: Date.now(),
      };
      state.savedForms.push(newForm);
      state.currentForm = newForm;
    },
    loadSavedForms: (state, action) => {
      state.savedForms = action.payload;
    },
    loadForm: (state, action) => {
      const form = state.savedForms.find(savedForm => savedForm.id === action.payload);
      if (form) {
        state.currentForm = { ...form };
        state.fields = [...form.fields];
      }
    },
    deleteForm: (state, action) => {
      state.savedForms = state.savedForms.filter(savedForm => savedForm.id !== action.payload);
      if (state.currentForm.id === action.payload) {
        state.currentForm = {
          id: 'default',
          name: 'New Form',
          fields: [],
        };
        state.fields = [];
      }
    },
    publishForm: (state, action) => {
      const formId = action.payload;
      const form = state.savedForms.find((f) => f.id === formId);
      if (form) {
        form.publishUrl = `/public-form/${formId}`; // Generate publish URL
      }
    },
  },
});

export const {
  addField,
  removeField,
  updateField,
  reorderFields,
  resetForm,
  saveForm,
  loadSavedForms,
  loadForm,
  deleteForm,
  publishForm,
} = formSlice.actions;

export default formSlice.reducer;