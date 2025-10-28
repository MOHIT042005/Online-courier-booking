import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const pageStyles = {
  height: '100vh',
  position: 'relative',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  backgroundImage:
    'url(https://images.unsplash.com/photo-1503424886304-82384b5dad7b?auto=format&fit=crop&w=1470&q=80)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const overlayStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(91, 60, 15, 0.6)',
  zIndex: 1,
};

const styles = {
  container: {
    position: 'relative',
    zIndex: 2,
    width: '420px',
    padding: '2.5rem 3rem',
    backgroundColor: 'rgba(243, 236, 228, 0.95)',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(101, 67, 33, 0.35)',
    color: '#5d432c',
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem',
    fontWeight: '700',
    fontSize: '2rem',
    letterSpacing: '0.06em',
  },
  label: {
    display: 'block',
    marginBottom: '0.3rem',
    fontWeight: '600',
    fontSize: '1rem',
    letterSpacing: '0.02em',
  },
  input: {
    width: '100%',
    padding: '14px 18px',
    marginBottom: '1.3rem',
    borderRadius: '8px',
    border: '1.5px solid #b99a6b',
    fontSize: '1.05rem',
    backgroundColor: '#fff8f0',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
    color: '#5d432c',
  },
  inputFocus: {
    borderColor: '#8c6e4a',
    outline: 'none',
    boxShadow: '0 0 6px rgba(140, 110, 74, 0.5)',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#7f5a24',
    border: 'none',
    borderRadius: '8px',
    color: '#fdf6e4',
    fontWeight: '700',
    fontSize: '1.2rem',
    cursor: 'pointer',
    letterSpacing: '0.05em',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#5d432c',
  },
  resendButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#a67835',
    border: 'none',
    borderRadius: '8px',
    color: '#fff8f0',
    fontWeight: '600',
    marginTop: '0.8rem',
    cursor: 'pointer',
  },
  newUser: {
    marginTop: '1.8rem',
    textAlign: 'center',
    color: '#5d432c',
    fontSize: '0.9rem',
  },
  link: {
    color: '#7f5a24',
    fontWeight: '700',
    textDecoration: 'none',
    marginLeft: '0.3rem',
  },
  linkHover: {
    textDecoration: 'underline',
  },
  error: {
    color: '#a94442',
    marginTop: '0.8rem',
    fontWeight: '600',
    textAlign: 'center',
  },
  success: {
    color: '#2e7d32',
    marginTop: '0.8rem',
    fontWeight: '600',
    textAlign: 'center',
  },
};

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [inputFocus, setInputFocus] = useState({});
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
    setSuccess(null);
  };

  const handleFocus = (name) => {
    setInputFocus((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (name) => {
    setInputFocus((prev) => ({ ...prev, [name]: false }));
  };

  // 1️⃣ Handle registration and OTP send
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const res = await api.post('/auth/register', formData);
      setSuccess(res.data.message || 'OTP sent to your email! Please verify.');
      setShowOtpField(true);
      setOtpSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please enter a valid email.');
    }
  };

  // 2️⃣ Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/verify-otp', { email: formData.email, otp });
      setSuccess(res.data.message || 'Your email has been verified!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP.');
    }
  };

  // 3️⃣ Resend OTP
  const handleResendOtp = async () => {
    try {
      const res = await api.post('/auth/resend-otp', { email: formData.email });
      setSuccess(res.data.message || 'New OTP sent successfully!');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP.');
    }
  };

  return (
    <div style={pageStyles}>
      <div style={overlayStyles} />
      <div style={styles.container}>
        <h2 style={styles.title}>Create Your Courier Account</h2>

        {!showOtpField ? (
          <form onSubmit={handleSubmit} autoComplete="off">
            <label htmlFor="username" style={styles.label}>Username</label>
            <input
              id="username"
              name="username"
              placeholder="Enter your username"
              onChange={handleChange}
              onFocus={() => handleFocus('username')}
              onBlur={() => handleBlur('username')}
              style={{
                ...styles.input,
                ...(inputFocus.username ? styles.inputFocus : {}),
              }}
              required
            />
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={() => handleBlur('email')}
              style={{
                ...styles.input,
                ...(inputFocus.email ? styles.inputFocus : {}),
              }}
              required
            />
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              onFocus={() => handleFocus('password')}
              onBlur={() => handleBlur('password')}
              style={{
                ...styles.input,
                ...(inputFocus.password ? styles.inputFocus : {}),
              }}
              autoComplete="new-password"
              required
            />
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
            >
              Register & Get OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <label htmlFor="otp" style={styles.label}>Enter the 4-digit OTP</label>
            <input
              id="otp"
              name="otp"
              placeholder="Enter your OTP"
              maxLength="4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={styles.input}
              required
            />
            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
            >
              Verify OTP & Continue
            </button>
            {otpSent && (
              <button
                type="button"
                style={styles.resendButton}
                onClick={handleResendOtp}
              >
                Resend OTP
              </button>
            )}
          </form>
        )}

        {success && <p style={styles.success}>{success}</p>}
        {error && <p style={styles.error}>{error}</p>}
        {!showOtpField && (
          <p style={styles.newUser}>
            Already have an account?
            <Link
              to="/login"
              style={styles.link}
              onMouseOver={(e) => (e.currentTarget.style.textDecoration = styles.linkHover.textDecoration)}
              onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
