import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/home/Home';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Market from './components/market/market';
import Profile from './components/profile/profile';
import Note from './components/note/note';
import ADDproject from './components/market/addProject/addProject';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/market" element={<Market />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/note" element={<Note />} />
        <Route path="/add-project" element={<ADDproject />} />
      </Routes>
    </Router>
  );
};


export default App;
