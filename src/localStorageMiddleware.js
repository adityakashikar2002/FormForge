// src/localStorageMiddleware.js

const localStorageMiddleware = store => next => action => {
    const result = next(action);
    localStorage.setItem('formState', JSON.stringify(store.getState().form));
    return result;
  };
  
  export default localStorageMiddleware;