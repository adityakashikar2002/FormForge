import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('formState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem('formState', JSON.stringify(state));
  } catch (e) {
    console.error("Could not save state", e);
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
  preloadedState: preloadedState,
});

store.subscribe(() => {
  saveState(store.getState()); // Save the entire state
});