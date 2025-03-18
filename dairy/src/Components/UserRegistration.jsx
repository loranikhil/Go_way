// UserRegistrationForm.jsx
import { useState } from 'react';
import './UserRegistrationForm.css';

function UserRegistrationForm() {
  // Form state management
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    aadharNumber: '',
    password: '',
    confirmPassword: ''
  });
  
  // Error state management
  const [errors, setErrors] = useState({});
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (formData.mobileNumber.length !== 10) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.aadharNumber) {
      newErrors.aadharNumber = 'Aadhar number is required';
    } else if (formData.aadharNumber.length !== 12) {
      newErrors.aadharNumber = 'Aadhar number must be 12 digits';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      newErrors.password = 'Password must contain at least 8 characters with uppercase, lowercase, number, and special character';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, make API call to submit form
      console.log("Form submitted successfully!", formData);
      alert("Registration successful!");
      // Reset form or redirect user
    }
  };
  
  // Handle back button (in a real app, this would navigate to previous page)
  const handleBack = () => {
    console.log("Back button clicked");
    // In a real app: navigate to previous page or Home
  };

  return (
    <div className="registration-container">
      <div className="form-card">
        <h1 className="form-title">User Registration</h1>
        <p className="form-subtitle">Join us today and get started!</p>
        
        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="fullName"
              className={`form-input ${errors.fullName ? 'error-input' : ''}`}
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <div className="input-group">
              <span className="country-code">+91</span>
              <input
                type="tel"
                name="mobileNumber"
                className={`form-input ${errors.mobileNumber ? 'error-input' : ''}`}
                placeholder="Enter your mobile number"
                value={formData.mobileNumber}
                onChange={handleChange}
                maxLength={10}
              />
            </div>
            {errors.mobileNumber && <p className="error-text">{errors.mobileNumber}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              className={`form-input ${errors.dateOfBirth ? 'error-input' : ''}`}
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            {errors.dateOfBirth && <p className="error-text">{errors.dateOfBirth}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              className={`form-select ${errors.gender ? 'error-input' : ''}`}
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="error-text">{errors.gender}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              className={`form-textarea ${errors.address ? 'error-input' : ''}`}
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p className="error-text">{errors.address}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Aadhar Number</label>
            <input
              type="text"
              name="aadharNumber"
              className={`form-input ${errors.aadharNumber ? 'error-input' : ''}`}
              placeholder="Enter your 12-digit Aadhar number"
              value={formData.aadharNumber}
              onChange={handleChange}
              maxLength={12}
            />
            {errors.aadharNumber && <p className="error-text">{errors.aadharNumber}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Create Password</label>
            <input
              type="password"
              name="password"
              className={`form-input ${errors.password ? 'error-input' : ''}`}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
            />
            <p className="password-hint">
              Password must contain at least 8 characters with uppercase, lowercase, number, and special character.
            </p>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={`form-input ${errors.confirmPassword ? 'error-input' : ''}`}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
          </div>
          
          <div className="button-group">
            <button 
              type="button" 
              onClick={handleBack}
              className="back-button outline-btn"
            >
              Back
            </button>
            <button 
              type="submit" 
              className="submit-button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserRegistrationForm;