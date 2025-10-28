import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api'; // your axios or fetch wrapper instance

export default function EmailVerification() {
  const { token } = useParams();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await api.get(`/auth/verify-email/${token}`);
        setStatus('success');
        setMessage(res.data || 'Email verified successfully! You can now login.');
      } catch (err) {
        setStatus('error');
        setMessage(
          err.response?.data?.message ||
            'Verification failed or token expired. Please try registering again.'
        );
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus('error');
      setMessage('Invalid verification token.');
    }
  }, [token]);

  return (
    <div
      style={{
        maxWidth: '480px',
        margin: '4rem auto',
        padding: '2rem',
        backgroundColor: '#f3ece4',
        borderRadius: '12px',
        textAlign: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {status === 'verifying' && <p>Verifying your email, please wait...</p>}
      {(status === 'success' || status === 'error') && (
        <>
          <p style={{ color: status === 'success' ? 'green' : 'red', fontWeight: '600' }}>
            {message}
          </p>
          {status === 'success' && (
            <Link to="/login" style={{ color: '#7f5a24', fontWeight: '700', textDecoration: 'none' }}>
              Go to Login
            </Link>
          )}
        </>
      )}
    </div>
  );
}
