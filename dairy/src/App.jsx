import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SignUp from './Components/SignUp';
import UserDetails from './Components/UserDetails';
import UserRegistration from './Components/UserRegistration';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user-details" element={<UserDetails />} />
          {/* <Route path="/login" element={<div className="placeholder-page">Login Page (Placeholder)</div>} /> */}
          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="/UserRegistration" element={<UserRegistration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;