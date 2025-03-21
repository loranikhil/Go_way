import React from 'react';

const ServiceCard = ({ title, subtitle, icon, badge, onClick }) => {
  return (
    <div className="service-card" onClick={onClick}>
      <div className="service-content">
        <div className="service-info">
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <div className="service-icon">
          {icon}
        </div>
      </div>
      
      {badge && (
        <div className={`service-badge ${badge.type}`}>
          {badge.text}
        </div>
      )}
    </div>
  );
};

export default ServiceCard;