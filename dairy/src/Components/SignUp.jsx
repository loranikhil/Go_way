import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import './SignUp.css';
import LoadingGif from './LoadingGif';

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
    },
    showPassword: false,
    showConfirmPassword: false
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

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setFormState(prevState => ({
        ...prevState,
        showPassword: !prevState.showPassword
      }));
    } else if (field === 'confirmPassword') {
      setFormState(prevState => ({
        ...prevState,
        showConfirmPassword: !prevState.showConfirmPassword
      }));
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

    const userData = {
      mobileNumber: formState.mobileNumber,
      passwordHash: btoa(formState.password), 
      registeredAt: new Date().toISOString()
    };

    localStorage.setItem('userAuth', JSON.stringify(userData));
    
    localStorage.setItem('currentUser', JSON.stringify({
      mobileNumber: formState.mobileNumber,
      loggedInAt: new Date().toISOString()
    }));
    
    console.log('User registered successfully:', userData);
    console.log('localStorage data:', localStorage.getItem('userAuth'));
    
    navigate('/user-details');
  };

  return (
    <LoadingGif>
      <div className="signup-container">
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
            <h2>Welcome to GoWay</h2>
            <p>Have a safe ride</p>
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
                  inputMode="numeric"
                  pattern="[0-9]*"
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
              {formState.otpSent && !formState.otpVerified && (
                <span className="hint">Enter any 6-digit OTP to verify</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Create Password</label>
              <div className="password-wrapper">
                <input
                  type={formState.showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Create a strong password"
                  value={formState.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="eye-icon"
                  onClick={() => togglePasswordVisibility('password')}
                >
                  {formState.showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formState.formErrors.password && (
                <span className="error">{formState.formErrors.password}</span>
              )}
              <span className="hint">
                Password must contain at least 8 characters with uppercase, lowercase, 
                number, and special character
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={formState.showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formState.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="eye-icon"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                >
                  {formState.showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formState.formErrors.confirmPassword && (
                <span className="error">{formState.formErrors.confirmPassword}</span>
              )}
            </div>

            <button 
              type="submit" 
              className={`btn-signup ${!formState.otpVerified ? 'disabled' : ''}`}
              disabled={!formState.otpVerified}
            >
              Create Account
            </button>

            <div className="login-option">
              Already have an account? <a href="/login">Login</a>
            </div>
          </form>
        </div>
      </div>
    </LoadingGif>
  );
};

export default SignUp;