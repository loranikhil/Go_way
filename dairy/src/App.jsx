import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp';
import CreatePassword from './Components/CreatePassword';
import UserDetails from './Components/UserDetails';

import Login from './Components/Login';
import Home from './pages/Home';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
        <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create-password" element={<CreatePassword />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/" element={<Navigate to="/signup" replace />} />
       
        </Routes>
      </div>
    </Router>
  );
}

export default App;