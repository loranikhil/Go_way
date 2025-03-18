import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    mobileNumber: '',
    otp: '',
    password: '',
    confirmPassword: '',
    otpSent: false,
    otpVerified: false,
    formErrors: {
      mobileNumber: '',
      otp: '',
      password: '',
      confirmPassword: ''
    }
  });

  const validateMobileNumber = (mobileNumber) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(mobileNumber);
  };

  const validatePassword = (password) => {
    
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
      formErrors: {
        ...prevState.formErrors,
        [name]: ''
      }
    }));
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!validateMobileNumber(formState.mobileNumber)) {
      setFormState(prevState => ({
        ...prevState,
        formErrors: {
          ...prevState.formErrors,
          mobileNumber: 'Please enter a valid 10-digit mobile number'
        }
      }));
      return;
    }

   
    console.log(`Sending OTP to ${formState.mobileNumber}`);
    
    setFormState(prevState => ({
      ...prevState,
      otpSent: true
    }));
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (formState.otp.length !== 6) {
      setFormState(prevState => ({
        ...prevState,
        formErrors: {
          ...prevState.formErrors,
          otp: 'Please enter a valid 6-digit OTP'
        }
      }));
      return;
    }

   
    console.log(`Verifying OTP: ${formState.otp}`);
    
    setFormState(prevState => ({
      ...prevState,
      otpVerified: true
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    

    if (!validateMobileNumber(formState.mobileNumber)) {
      errors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!formState.otpVerified) {
      errors.otp = 'Please verify your OTP';
    }
    
    if (!validatePassword(formState.password)) {
      errors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }
    
    if (formState.password !== formState.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(errors).length > 0) {
      setFormState(prevState => ({
        ...prevState,
        formErrors: {
          ...prevState.formErrors,
          ...errors
        }
      }));
      return;
    }

  
    localStorage.setItem('userAuth', JSON.stringify({
      mobileNumber: formState.mobileNumber
    }));

    navigate('/user-details');
  };

  return (
    <div className="signup-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h2>Create Account</h2>
          <p>Join us today and get started!</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
      
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <div className="input-group">
              <span className="country-code">+91</span>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="*******"
                value={formState.mobileNumber}
                onChange={handleInputChange}
                disabled={formState.otpVerified}
                maxLength="10"
                required
              />
              {!formState.otpSent ? (
                <button 
                  type="button"
                  className="btn-send-otp" 
                  onClick={handleSendOtp}
                >
                  Send OTP
                </button>
              ) : !formState.otpVerified ? (
                <button 
                  type="button"
                  className="btn-resend-otp-inline" 
                  onClick={handleSendOtp}
                >
                  Resend
                </button>
              ) : (
                <span className="verified-badge">✓</span>
              )}
            </div>
            {formState.formErrors.mobileNumber && (
              <span className="error">{formState.formErrors.mobileNumber}</span>
            )}
          </div>

        
          <div className="form-group">
            <label htmlFor="otp">OTP Verification</label>
            <div className="input-group">
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter 6-digit OTP"
                value={formState.otp}
                onChange={handleInputChange}
                disabled={formState.otpVerified}
                maxLength="6"
                required
              />
              {!formState.otpVerified && (
                <button 
                  type="button"
                  className="btn-verify-otp" 
                  onClick={handleVerifyOtp}
                  disabled={!formState.otpSent}
                >
                  Verify
                </button>
              )}
            </div>
            {formState.formErrors.otp && (
              <span className="error">{formState.formErrors.otp}</span>
            )}
          </div>

        
          <div className="form-group">
            <label htmlFor="password">Create Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a strong password"
              value={formState.password}
              onChange={handleInputChange}
              required
            />
            {formState.formErrors.password && (
              <span className="error">{formState.formErrors.password}</span>
            )}
            <span className="password-hint">
              Password must contain at least 8 characters with uppercase, lowercase, 
              number, and special character
            </span>
          </div>

 
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formState.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {formState.formErrors.confirmPassword && (
              <span className="error">{formState.formErrors.confirmPassword}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="btn-signup"
            disabled={!formState.otpVerified}
          >
            Continue
          </button>

          <div className="login-option">
            Already have an account? <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;