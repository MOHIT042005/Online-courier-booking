import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Online Courier Booking Frontend</h1>
      <p>Backend message: {message}</p>
    </div>
  );
}

export default App;
