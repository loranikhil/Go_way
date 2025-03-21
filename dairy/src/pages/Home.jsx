import React from 'react';
import Navbar from '../Components/Navbar';
import MapView from '../Components/MapView';
import SearchBar from '../Components/SearchBar';
import ServiceCard from '../Components/ServiceCard';
import BottomNav from '../Components/BottomNav';
import { FaCoins } from "react-icons/fa6";
import { IoWallet } from "react-icons/io5";



const Home = () => {
  const services = [
    {
      title: 'Upto 30% Off',
      subtitle: 'Claim tokens',
      icon: <FaCoins size={24} />,
      badge: { text: '30% OFF', type: 'discount' }
    },
    {
      title: 'Wallet',
      subtitle: 'Add Money',
      icon: <IoWallet size={24} />,
      badge: { text: 'ADD+', type: 'new' }
    },
   
  ];

  return (
    <div className="home-container">
      <Navbar />
      <MapView />
      
      <div className="search-section">
        <SearchBar />
      </div>

      <div className="services-container">
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              subtitle={service.subtitle}
              icon={service.icon}
              badge={service.badge}
            />
          ))}
        </div>
      </div>
      
     
      
      <div className="balance-section">
        <div className="balance-container">
          <div className="balance-icon">
            <span>₹</span>
          </div>
          <div className="balance-text">Balance</div>
          <div className="balance-amount">40</div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;