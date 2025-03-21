import React from 'react';
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { FaCoins } from "react-icons/fa6";
import { IoWallet } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { PiMotorcycleFill } from "react-icons/pi";
import "./ProfileDropdown.css"

const ProfileDropdown = ({ onClose }) => {
  
  const user = {
    name: 'Nik',
    email: 'nik@gmail.com',
    avatar: 'https://png.pngtree.com/png-vector/20240601/ourmid/pngtree-casual-man-flat-design-avatar-profile-picture-vector-png-image_12593008.png',
    token: '410 coins'
  };

  return (
    <div className="profile-dropdown">
      <div className="dropdown-overlay" onClick={onClose} />
      <div className="dropdown-content">
        <div className="user-info">
          <div className="avatar-container">
            <img src={user.avatar} alt="User Avatar" className="user-avatar" />
          </div>
          <div className="user-details">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>
        
        <div className="dropdown-divider" />
        
        <ul className="dropdown-menu">
          <li className="dropdown-item">
            <FiUser size={18} />
            <span>Profile</span>
          </li>
          <li className="dropdown-item">
            <PiMotorcycleFill size={18} />
            <span>My Rides</span>
          </li>
          <li className="dropdown-item">
            <IoWallet size={18} />
            <span>Wallet</span>
          </li>
          <li className="dropdown-item">
            <FaCoins size={18} />
            <span>Tokens</span>
          </li>
          <li className="dropdown-item">
            <BiSupport size={18} />
            <span>Support</span>
          </li>
          <li className="dropdown-item">
            <FiSettings size={18} />
            <span>Settings</span>
          </li>
          
          <li className="dropdown-item logout-item">
            <FiLogOut size={18} />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDropdown;