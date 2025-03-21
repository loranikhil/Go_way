import React from 'react';
import { FiHome, FiZap } from 'react-icons/fi';
import { FaCoins } from "react-icons/fa6";
import { IoWallet } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import "./BottomNav.css"

const BottomNav = () => {
  const navItems = [
    { icon: <FiHome size={24} />, label: 'Home', active: true },
    { icon: <FaCoins size={24} />, label: 'Tokens' },
    { icon: <IoWallet size={24} />, label: 'Wallet' },
    { icon: <FiZap size={24} />, label: 'Features' },
    { icon: <BiSupport size={24} />, label: 'Support' }
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item, index) => (
        <div 
          key={index} 
          className={`bottom-nav-item ${item.active ? 'active' : ''}`}
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;