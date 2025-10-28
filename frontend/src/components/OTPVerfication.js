import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const styles = {
  container: {
    maxWidth: '420px',
    margin: '5rem auto',
    padding: '2.5rem 3rem',
    backgroundColor: '#f3ece4',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(101, 67, 33, 0.35)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#5d432c',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    marginBottom: '1.5rem',
  },
  input: {
    width: '100%',
    padding: '14px 18px',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1.5px solid #b99a6b',
    fontSize: '1.1rem',
    backgroundColor: '#fff8f0',
    color: '#5d432c',
    boxSizing: 'border-box',
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
    marginTop: '1rem',
  },
  resendButton: {
    marginTop: '1rem',
    backgroundColor: '#a67c00',
    color: '#fffcea',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '7px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  error: {
    color: '#a94442',
    marginTop: '1rem',
    fontWeight: '600',
  },
  success: {
    color: '#2e7d32',
    marginTop: '1rem',
    fontWeight: '600',
  },
};

export default function OTPVerification() {
  const [formData, setFormData] = useState({ email: '', otp: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [resendMessage, setResendMessage] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
    setSuccess(null);
    setResendMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await api.post('/auth/verify-otp', formData);
      setSuccess(response.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed.');
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendMessage('');
    try {
      const response = await api.post('/auth/resend-otp', { email: formData.email });
      setResendMessage(response.data.message);
    } catch (err) {
      setResendMessage(err.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Verify Your Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your registered email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="otp"
          placeholder="Enter 4-digit OTP"
          value={formData.otp}
          onChange={handleChange}
          maxLength={4}
          pattern="\d{4}"
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button} disabled={!formData.email || !formData.otp}>
          Verify OTP
        </button>
      </form>

      <button
        onClick={handleResend}
        style={styles.resendButton}
        disabled={resendLoading || !formData.email}
      >
        {resendLoading ? 'Sending OTP...' : 'Resend OTP'}
      </button>

      {resendMessage && <div style={styles.success}>{resendMessage}</div>}
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success} Redirecting to login...</div>}
    </div>
  );
}
