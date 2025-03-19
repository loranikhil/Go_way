import React, { useState } from 'react';
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
    }
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

    const userAuth = JSON.parse(localStorage.getItem('userAuth'));
    if (!userAuth || userAuth.mobileNumber !== formState.mobileNumber) {
      setFormState(prevState => ({
        ...prevState,
        formErrors: {
          ...prevState.formErrors,
          mobileNumber: 'Mobile number not registered. Please sign up first.'
        }
      }));
      return;
    }

    console.log(`Sending OTP to ${formState.mobileNumber}`);
    console.log('Any 6-digit OTP will work for login');
    
    setFormState(prevState => ({
      ...prevState,
      otpSent: true
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    
    if (!validateMobileNumber(formState.mobileNumber)) {
      errors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    
    if (formState.otp.length !== 6) {
      errors.otp = 'Please enter a valid 6-digit OTP';
      setFormState(prevState => ({
        ...prevState,
        formErrors: {
          ...prevState.formErrors,
          ...errors
        }
      }));
      return;
    }

    const userAuth = JSON.parse(localStorage.getItem('userAuth'));
    if (!userAuth || userAuth.mobileNumber !== formState.mobileNumber) {
      errors.mobileNumber = 'Mobile number not registered. Please sign up first.';
      setFormState(prevState => ({
        ...prevState,
        formErrors: {
          ...prevState.formErrors,
          ...errors
        }
      }));
      return;
    }

    console.log('User logged in successfully:', formState.mobileNumber);

    localStorage.setItem('currentUser', JSON.stringify({
      mobileNumber: formState.mobileNumber,
      loggedInAt: new Date().toISOString()
    }));

    navigate('/Home');
  };

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h2>Login</h2>
          <p>Welcome back!</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <div className="input-group">
              <span className="country-code">+91</span>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                placeholder="Enter 10 digits"
                value={formState.mobileNumber}
                onChange={handleInputChange}
                maxLength="10"
                required
              />
              {!formState.otpSent && (
                <button 
                  type="button"
                  className="btn-send-otp" 
                  onClick={handleSendOtp}
                >
                  Send OTP
                </button>
              )}
              {formState.otpSent && (
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
              disabled={!formState.otpSent}
              required
            />
            {formState.formErrors.otp && (
              <span className="error">{formState.formErrors.otp}</span>
            )}
            {formState.otpSent && (
              <span className="otp-hint">Enter any 6-digit OTP to login</span>
            )}
          </div>

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