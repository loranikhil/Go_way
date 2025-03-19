import React, { useState, useEffect } from 'react';
 
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
        <img src="/public/333.gif" alt="Loading..." />
      ) : (
        children
      )}
    </div>
  );
};
 
export default LoadingGif;