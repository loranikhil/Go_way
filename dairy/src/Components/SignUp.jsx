import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import LoadingGif from './LoadingGif';
import OTPKeypad from './OTPKeypad';

const SignUp = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    mobileNumber: '',
    otp: '',
    otpSent: false,
    otpVerified: false,
    formErrors: {
      mobileNumber: '',
      otp: ''
    }
  });
  const [showOTPKeypad, setShowOTPKeypad] = useState(false);

  const validateMobileNumber = (mobileNumber) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(mobileNumber);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'mobileNumber' && !/^\d*$/.test(value)) {
      return;
    }
    
    if (name === 'otp' && !/^\d*$/.test(value)) {
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

  const handleOTPFocus = () => {
    if (!formState.otpVerified && formState.otpSent) {
      setShowOTPKeypad(true);  
    }
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
    
    if (formState.otp.length === 6 && !formState.otpVerified) {
      handleVerifyOtp();
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

    const userAuth = JSON.parse(localStorage.getItem('userAuth'));
    if (userAuth && userAuth.mobileNumber === formState.mobileNumber) {
      setFormState(prevState => ({
        ...prevState,
        formErrors: {
          ...prevState.formErrors,
          mobileNumber: 'Mobile number already registered. Please login instead.'
        }
      }));
      return;
    }

    console.log(`Sending OTP to ${formState.mobileNumber}`);
    console.log('Any 6-digit OTP will work for verification');
    
    setFormState(prevState => ({
      ...prevState,
      otpSent: true,
      otp: ''
    }));
  };

  const handleVerifyOtp = (e) => {
    if (e) e.preventDefault();
    
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

    setFormState(prevState => ({
      ...prevState,
      otpVerified: true
    }));
    setShowOTPKeypad(false);
  
    navigate('/create-password', { 
      state: { mobileNumber: formState.mobileNumber }
    });
  };

  return (
    <LoadingGif>
      <div className="signup-container">
        <div className="logo-container">
        
        <img src="https://i.ibb.co/qLJxs2Yd/2-removebg-preview.png" alt="GoWay" />
        </div>
        
        <div className="form-wrapper">  
          <div className="form-header">
            <h2>Welcome to GoWay</h2>
            <p>Create your account</p>
          </div>

          <form className="signup-form" onSubmit={handleVerifyOtp}>
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
                  disabled={formState.otpVerified}
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
                ) : !formState.otpVerified ? (
                  <button 
                    type="button"
                    className="btn-resend-otp" 
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
              <div className="otp-container">
                {[...Array(6)].map((_, index) => (
                  <div 
                    key={index} 
                    className={`otp-input-box ${
                      formState.otp.length > index ? 'filled' : ''
                    } ${formState.otp.length === index && !formState.otpVerified ? 'active' : ''}`}

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
                  onFocus={handleOTPFocus}
                  readOnly={formState.otpSent && !formState.otpVerified}
                  disabled={formState.otpVerified}
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

            <div className="login-option">
              Already have an account? <a href="/login">Login</a>
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

export default SignUp;
