import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const pageStyles = {
  height: '100vh',
  position: 'relative',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  backgroundImage: 'url(https://images.unsplash.com/photo-1503424886304-82384b5dad7b?auto=format&fit=crop&w=1470&q=80)', // courier/delivery related image
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const overlayStyles = {
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(91, 60, 15, 0.6)', // warm dark brown overlay, 60% opacity
  zIndex: 1,
};

const styles = {
  container: {
    position: 'relative',
    zIndex: 2, // above overlay
    width: '420px',
    padding: '2.5rem 3rem',
    backgroundColor: 'rgba(243, 236, 228, 0.95)', // light beige, slightly transparent
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(101, 67, 33, 0.35)', // soft brown shadow
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
};

export default function Register() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);
  const [inputFocus, setInputFocus] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post('/auth/register', formData);
      login(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleFocus = (name) => {
    setInputFocus((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (name) => {
    setInputFocus((prev) => ({ ...prev, [name]: false }));
  };

  return (
    <div style={pageStyles}>
      <div style={overlayStyles} />
      <div style={styles.container}>
        <h2 style={styles.title}>Create Your Courier Account</h2>
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
            Register
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
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
      </div>
    </div>
  );
}
