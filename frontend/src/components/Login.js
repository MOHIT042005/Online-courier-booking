import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const styles = {
  container: {
    maxWidth: '380px',
    margin: '5rem auto',
    padding: '2rem 2.5rem',
    backgroundColor: '#efe6d6', // lighter beige with yellow tint
    borderRadius: '14px',
    boxShadow: '0 6px 20px rgba(115, 78, 35, 0.3)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.8rem',
    color: '#6b4f27',
    fontWeight: '700',
    fontSize: '1.9rem',
    letterSpacing: '0.05em',
  },
  label: {
    display: 'block',
    marginBottom: '0.3rem',
    color: '#6b4f27',
    fontWeight: '600',
    fontSize: '0.95rem',
  },
  input: {
    width: '100%',
    padding: '13px 16px',
    marginBottom: '1.1rem',
    borderRadius: '7px',
    border: '1.8px solid #d1b97a',
    fontSize: '1rem',
    color: '#6b4f27',
    backgroundColor: '#fffbea',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
  },
  inputFocus: {
    borderColor: '#a67c00',
    outline: 'none',
    boxShadow: '0 0 8px rgba(166, 124, 0, 0.5)',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#a67c00',
    border: 'none',
    borderRadius: '7px',
    color: '#fffcea',
    fontWeight: '700',
    fontSize: '1.15rem',
    cursor: 'pointer',
    letterSpacing: '0.04em',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#7a5b00',
  },
  error: {
    color: '#9b2c2c',
    marginTop: '0.6rem',
    fontWeight: '600',
    textAlign: 'center',
  },
  newUser: {
    marginTop: '1.8rem',
    textAlign: 'center',
    color: '#6b4f27',
    fontSize: '0.9rem',
  },
  link: {
    color: '#a67c00',
    fontWeight: '700',
    textDecoration: 'none',
    marginLeft: '0.3rem',
  },
  linkHover: {
    textDecoration: 'underline',
  },
};

export default function Login() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [inputFocus, setInputFocus] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post('/auth/login', formData);
      login(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleFocus = (name) => {
    setInputFocus((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (name) => {
    setInputFocus((prev) => ({ ...prev, [name]: false }));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome Back</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
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
          autoComplete="current-password"
          required
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
        >
          Login
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
      <p style={styles.newUser}>
        New here?
        <Link
          to="/register"
          style={styles.link}
          onMouseOver={(e) => (e.currentTarget.style.textDecoration = styles.linkHover.textDecoration)}
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
        >
          Register
        </Link>
      </p>
    </div>
  );
}
