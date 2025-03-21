import React, { useState } from 'react';
import ProfileDropdown from './ProfileDropdown';
import { FiMenu } from 'react-icons/fi';
import { MdMyLocation } from "react-icons/md";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Madhapur, Hyderabad');

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-left">
          <button className="menu-btn" onClick={toggleDropdown}>
            <FiMenu size={24} />
          </button>
          <div className="location-indicator">
            <div className="location-dot" />
            <span className="location-text">{currentLocation}</span>
          </div>
        </div>
        <div className="navbar-right">
          <button className="favorite-btn">
            <MdMyLocation size={24} />
          </button>
        </div>
      </div>
      
      {isDropdownOpen && (
        <ProfileDropdown onClose={toggleDropdown} />
      )}
    </div>
  );
};

export default Navbar;