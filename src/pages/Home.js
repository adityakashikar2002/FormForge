import React from 'react';
import FormBuilder from '../components/FormBuilder';
import Sidebar from '../components/Sidebar';
import '../components/FormBuilder.css';

const Home = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <FormBuilder />
    </div>
  );
};

export default Home;
