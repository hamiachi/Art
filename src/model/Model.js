import React from 'react';
import Navbar from './NavBar';
import ModelList from './ModelList';
import { useState } from 'react';


function Model() {

  const [currentTab, setCurrentTab] = useState('all');

  const handleTabChange = (newValue) => {
    setCurrentTab(newValue);
    console.log(currentTab)
  };

  return (
    <div className="App">
      <Navbar currentTab={currentTab} handleTabChange={handleTabChange} />
      <ModelList currentTab={currentTab} />
    </div>
  );
}

export default Model;
