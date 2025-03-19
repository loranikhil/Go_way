import React, { useState, useEffect } from 'react';
import './LoadingGif.css'; 

const LoadingGif = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <img
          src="/public/bike.gif"
          alt="Loading..."
          className="loading-gif" 
        />
      ) : (
        children
      )}
    </div>
  );
};

export default LoadingGif;
