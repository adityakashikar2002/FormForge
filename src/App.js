// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FormPreview from './components/FormPreview'
import SavedForms from './components/SavedForms';
import PublicForm from './components/PublicForm'; // Import PublicForm
import { Provider } from 'react-redux';
import { store } from './store/store';
import './CSS.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preview" element={<FormPreview />} />
          <Route path="/saved-forms" element={<SavedForms />} />
          <Route path="/preview/:id" element={<FormPreview />} />
          <Route path="/public-form/:id" element={<PublicForm />} /> {/* Add public form route */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
