import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './component/Buttons/Menu';
import MainPage from './pages/MainPage';
import List from './pages/List';
import Project from './pages/Project';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="App">
      <Router>
        <Menu></Menu>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/list' element={<List />} />
          <Route path='/list/:category/:title' element={<Project />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
