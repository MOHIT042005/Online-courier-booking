import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '3rem auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1>Dashboard</h1>
      <p>
        Welcome back, <strong>{user?.user?.username || 'User'}</strong>!
      </p>
      <p>Your email: {user?.user?.email}</p>

      <nav style={{ marginTop: '2rem' }}>
        <Link
          to="/bookinglist"
          style={{
            backgroundColor: '#7f5a24',
            color: '#fdf6e4',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '700',
            marginRight: '10px',
            display: 'inline-block',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#5d432c')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#7f5a24')}
        >
          View My Bookings
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        style={{
          backgroundColor: '#7f5a24',
          color: '#fdf6e4',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '700',
          marginTop: '2rem',
          fontSize: '1rem',
        }}
      >
        Logout
      </button>
    </div>
  );
}
