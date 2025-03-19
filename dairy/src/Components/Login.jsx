import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    mobileNumber: '',
    otp: '',
    otpSent: false,
    formErrors: {
      mobileNumber: '',
      otp: ''
    },
    userNotFound: false
  });

  const validateMobileNumber = (mobileNumber) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(mobileNumber);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
      formErrors: {
        ...prevState.formErrors,
        [name]: ''
      },
      userNotFound: false
    }));
  };

  const checkUserExists = (mobileNumber) => {
    const userAuth = localStorage.getItem('userAuth');
    if (!userAuth) return false;
    
    try {
      const userData = JSON.parse(userAuth);
      return userData.mobileNumber === mobileNumber;
    } catch (e) {
      console.error('Error parsing user auth data:', e);
      return false;
    }
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

    if (!checkUserExists(formState.mobileNumber)) {
      setFormState(prevState => ({
        ...prevState,
        userNotFound: true,
        formErrors: {
          ...prevState.formErrors,
          mobileNumber: 'No account found with this mobile number. Please sign up first.'
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

  const handleLogin = (e) => {
    e.preventDefault();
    const errors = {};
    
    if (!validateMobileNumber(formState.mobileNumber)) {
      errors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    
    if (formState.otp.length !== 6) {
      errors.otp = 'Please enter a valid 6-digit OTP';
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

    console.log(`Verifying OTP: ${formState.otp}`);
    console.log('Login successful');

    localStorage.setItem('isLoggedIn', 'true');

    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h2>Login to Your Account</h2>
          <p>Welcome back! Please login to continue</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <div className="input-group">
              <span className="country-code">+91</span>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="Enter your registered number"
                value={formState.mobileNumber}
                onChange={handleInputChange}
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
              ) : (
                <button 
                  type="button"
                  className="btn-resend-otp-inline" 
                  onClick={handleSendOtp}
                >
                  Resend
                </button>
              )}
            </div>
            {formState.formErrors.mobileNumber && (
              <span className="error">{formState.formErrors.mobileNumber}</span>
            )}
          </div>

          {formState.otpSent && (
            <div className="form-group">
              <label htmlFor="otp">OTP Verification</label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter 6-digit OTP"
                value={formState.otp}
                onChange={handleInputChange}
                maxLength="6"
                required
              />
              {formState.formErrors.otp && (
                <span className="error">{formState.formErrors.otp}</span>
              )}
            </div>
          )}

          <button 
            type="submit" 
            className="btn-login"
            disabled={!formState.otpSent}
          >
            Login
          </button>

          <div className="signup-option">
            Don't have an account? <a href="/signup">Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;