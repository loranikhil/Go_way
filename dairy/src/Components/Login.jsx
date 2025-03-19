import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import LoadingGif from './LoadingGif';
import OTPKeypad from './OTPKeypad';

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    mobileNumber: '',
    otp: '',
    password: '',
    otpSent: false,
    showPassword: false,
    formErrors: {
      mobileNumber: '',
      otp: '',
      password: ''
    }
  });
  const [showOTPKeypad, setShowOTPKeypad] = useState(false);

  const validateMobileNumber = (mobileNumber) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(mobileNumber);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if ((name === 'mobileNumber' || name === 'otp') && !/^\d*$/.test(value)) {
      return;
    }
    
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
      formErrors: {
        ...prevState.formErrors,
        [name]: ''
      }
    }));
  };

  const handleOTPClick = () => {
    if (!formState.otpVerified && formState.otpSent) {
      setShowOTPKeypad(true);
    }
  };

  const handleOTPKeyPress = (key) => {
    if (key === 'backspace') {
      setFormState(prevState => ({
        ...prevState,
        otp: prevState.otp.slice(0, -1),
        formErrors: {
          ...prevState.formErrors,
          otp: ''
        }
      }));
    } else if (formState.otp.length < 6) {
      setFormState(prevState => ({
        ...prevState,
        otp: prevState.otp + key,
        formErrors: {
          ...prevState.formErrors,
          otp: ''
        }
      }));
    }
  };

  const handleCloseKeypad = () => {
    setShowOTPKeypad(false);
    if (formState.otp.length === 6) {
      handleSubmit();
    }
  };

  const togglePasswordVisibility = () => {
    setFormState(prevState => ({
      ...prevState,
      showPassword: !prevState.showPassword
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
      otpSent: true,
      otp: ''
    }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    const errors = {};
    
    if (!validateMobileNumber(formState.mobileNumber)) {
      errors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }
    
    if (formState.otp.length !== 6) {
      errors.otp = 'Please enter a valid 6-digit OTP';
    }

    const userAuth = JSON.parse(localStorage.getItem('userAuth'));
    if (!userAuth || userAuth.mobileNumber !== formState.mobileNumber) {
      errors.mobileNumber = 'Mobile number not registered. Please sign up first.';
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

    localStorage.setItem('currentUser', JSON.stringify({
      mobileNumber: formState.mobileNumber,
      loggedInAt: new Date().toISOString()
    }));

    navigate('/Home');
  };

  return (
    <LoadingGif>
      <div className="login-container">
        <div className="logo-container">
          <div className="app-logo">
            <div className="go-logo">
              <div className="go-circle">
                <div className="go-seed"></div>
                <div className="go-seed seed-top-left"></div>
                <div className="go-seed seed-top-right"></div>
                <div className="go-seed seed-bottom-left"></div>
                <div className="go-seed seed-bottom-right"></div>
                <div className="go-seed seed-middle-right"></div>
                <div className="go-seed seed-middle-bottom"></div>
              </div>
            </div>
            <div className="yellow-dot small-dot"></div>
            <div className="yellow-dot large-dot"></div>
          </div>
        </div>

        <div className="form-wrapper">
          <div className="form-header">
            <h2>Welcome Back!</h2>
            <p>Login to your account</p>
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
                  inputMode="numeric"
                  pattern="[0-9]*"
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
                    className="btn-resend-otp" 
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
              <div className="otp-container">
                {[...Array(6)].map((_, index) => (
                  <div 
                    key={index} 
                    className={`otp-input-box ${formState.otp.length > index ? 'filled' : ''} ${formState.otp.length === index ? 'active' : ''}`}
                    onClick={handleOTPClick}  
                  >
                    {formState.otp[index] || ''}
                  </div>
                ))}
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  className="otp-input"
                  value={formState.otp}
                  onChange={handleInputChange}
                  maxLength="6"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  required
                />
              </div>
              {formState.formErrors.otp && (
                <span className="error">{formState.formErrors.otp}</span>
              )}
            </div>

            <button 
              type="submit" 
              className={`btn-login ${!formState.otpSent ? 'disabled' : ''}`}
              disabled={!formState.otpSent}
            >
              Login
            </button>

            <div className="signup-option">
              Don't have an account? <a href="/signup">Sign Up</a>
            </div>
          </form>
        </div>
        
        <OTPKeypad 
          isVisible={showOTPKeypad} 
          onKeyPress={handleOTPKeyPress} 
          onClose={handleCloseKeypad} 
        />
      </div>
    </LoadingGif>
  );
};

export default Login;
