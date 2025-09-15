import React, { useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post('/auth/register', formData);
      login(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Register</button>
      {error && <p style={{color:'red'}}>{error}</p>}
    </form>
  );
}
