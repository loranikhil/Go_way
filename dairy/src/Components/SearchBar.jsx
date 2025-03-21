import React, { useState } from 'react';
import { FiSearch, FiClock, FiMapPin, FiNavigation } from 'react-icons/fi';
import './SearchBar.css';

const SearchBar = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [recentSearches] = useState([
    'Jntu Bustop',
    'Madhapur Metro'
  ]);
  const [showRecent, setShowRecent] = useState(false);
  const [activeInput, setActiveInput] = useState(null);

  const handlePickupChange = (e) => {
    setPickupLocation(e.target.value);
    setActiveInput('pickup');
    setShowRecent(true);
  };

  const handleDropChange = (e) => {
    setDropLocation(e.target.value);
    setActiveInput('drop');
    setShowRecent(true);
  };

  const handleRecentItemClick = (item) => {
    if (activeInput === 'pickup') {
      setPickupLocation(item);
    } else if (activeInput === 'drop') {
      setDropLocation(item);
    }
    setShowRecent(false);
  };

  const handleSearchForRider = (e) => {
    e.preventDefault();
    console.log('Searching for rider:', { pickup: pickupLocation, drop: dropLocation });
  };

  const handleSearchForPassenger = (e) => {
    e.preventDefault();
    console.log('Searching for passenger:', { pickup: pickupLocation, drop: dropLocation });
  };

  const handleFocus = (inputType) => {
    setActiveInput(inputType);
    setShowRecent(true);
  };

  const handleBlur = () => {
    
    setTimeout(() => setShowRecent(false), 200);
  };

  return (
    <div className="search-container">
      <div className="search-form">
       
        <div className="input-container">
          <div className="input-wrapper">
            <div className="input-icon">
              <FiMapPin className="icon" />
            </div>
            <input
              type="text"
              placeholder="Enter pickup location"
              className="location-input"
              value={pickupLocation}
              onChange={handlePickupChange}
              onFocus={() => handleFocus('pickup')}
              onBlur={handleBlur}
            />
          </div>
        </div>

        <div className="input-container">
          <div className="input-wrapper">
            <div className="input-icon">
              <FiNavigation className="icon" />
            </div>
            <input
              type="text"
              placeholder="Enter drop location"
              className="location-input"
              value={dropLocation}
              onChange={handleDropChange}
              onFocus={() => handleFocus('drop')}
              onBlur={handleBlur}
            />
          </div>
        </div>

       
        <div className="button-container">
          <button
            onClick={handleSearchForRider}
            className="search-button rider-button"
          >
            <FiSearch className="button-icon" /> Search for Rider
          </button>
          <button
            onClick={handleSearchForPassenger}
            className="search-button passenger-button"
          >
            <FiSearch className="button-icon" /> Search for Passenger
          </button>
        </div>
      </div>

      {/* Recent Searches */}
      {showRecent && recentSearches.length > 0 && (
        <div className="recent-searches">
          <div className="recent-header">
            <FiClock className="recent-icon" />
            <span className="recent-title">Recent Searches</span>
          </div>
          <div className="recent-list">
            {recentSearches.map((search, index) => (
              <div
                key={index}
                className="recent-item"
                onClick={() => handleRecentItemClick(search)}
              >
                <FiClock className="recent-item-icon" />
                <span>{search}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;