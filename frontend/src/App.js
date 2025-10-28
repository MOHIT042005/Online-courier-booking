import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import BookingForm from './components/BookingForm';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './context/AuthContext';
import EmailVerification from './components/EmailVerification';
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import BookingList from "./components/BookingList";
import BookingDetails from './components/BookingDetails';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      style={{
        padding: '1rem',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Link to="/" style={{ marginRight: '1rem' }}>
          Home
        </Link>
        {!user && (
          <>
            <Link to="/login" style={{ marginRight: '1rem' }}>
              Login
            </Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {user && (
          <>
            <Link to="/booking" style={{ marginRight: '1rem' }}>
              New Booking
            </Link>
          </>
        )}
      </div>
      {user && (
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '6px 14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
          title="Logout"
        >
          Logout
        </button>
      )}
    </nav>
  );
}

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Online Courier Booking Frontend</h1>
      {!user ? (
        <p>
          Welcome to the Online Courier Booking System. Please <Link to="/login">Login</Link> or{' '}
          <Link to="/register">Register</Link>.
        </p>
      ) : (
        <>
          <p>
            Welcome back, <strong>{user.user?.username || 'User'}</strong>!
          </p>
          <p>
            Go to your <Link to="/booking">Courier Booking Form</Link>.
          </p>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email/:token" element={<EmailVerification />} />
        <Route
          path="/booking"
          element={
            <PrivateRoute>
              <BookingForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
           </ProtectedRoute>
  }
/>
<Route
  path="/bookinglist"
  element={
    <ProtectedRoute>
      <BookingList />
    </ProtectedRoute>
  }
  />
  <Route
  path="/booking/:id"
  element={
    <ProtectedRoute>
      <BookingDetails />
    </ProtectedRoute>
  }
/>


      </Routes>
    </Router>
  );
}

export default App;
