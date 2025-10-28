import React, { useState } from 'react';

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#f7f9fc',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
    fontWeight: '700',
    fontSize: '1.8rem',
  },
  sectionTitle: {
    color: '#5d432c',
    marginBottom: '1rem',
    fontSize: '1.2rem',
    fontWeight: '600',
    borderBottom: '1px solid #b99a6b',
    paddingBottom: '0.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.3rem',
    fontWeight: '600',
    fontSize: '1rem',
    color: '#5d432c',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    marginBottom: '1rem',
    borderRadius: '6px',
    border: '1.5px solid #b99a6b',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    minHeight: '80px',
    padding: '10px 14px',
    marginBottom: '1rem',
    borderRadius: '6px',
    border: '1.5px solid #b99a6b',
    fontSize: '1rem',
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '10px 14px',
    marginBottom: '1rem',
    borderRadius: '6px',
    border: '1.5px solid #b99a6b',
    fontSize: '1rem',
    boxSizing: 'border-box',
    backgroundColor: 'white',
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
  error: {
    color: '#a94442',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  success: {
    color: '#2e7d32',
    fontWeight: '600',
    marginBottom: '1rem',
    textAlign: 'center',
  },
};

export default function BookingForm() {
  const [form, setForm] = useState({
    senderName: '',
    senderAddress: '',
    senderPhone: '',
    receiverName: '',
    receiverAddress: '',
    receiverPhone: '',
    packageWeight: '',
    packageDimensions: '',
    packageDescription: '',
    deliveryType: 'standard',
    deliveryDate: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!form.senderName || !form.senderAddress || !form.senderPhone) {
      setError('Please fill all sender details.');
      return false;
    }
    if (!form.receiverName || !form.receiverAddress || !form.receiverPhone) {
      setError('Please fill all receiver details.');
      return false;
    }
    if (!form.packageWeight) {
      setError('Please specify package weight.');
      return false;
    }
    if (!form.deliveryDate) {
      setError('Please select a delivery date.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setError('');
    setSuccess('Booking submitted successfully!');

    // Here you will call your API to send booking data to backend

    // Reset form or keep data depending on your UX design
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Courier Booking Form</h2>
      
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}
      
      <form onSubmit={handleSubmit}>
        
        <div>
          <h3 style={styles.sectionTitle}>Sender Details</h3>
          <label style={styles.label} htmlFor="senderName">Name</label>
          <input 
            type="text" 
            id="senderName" 
            name="senderName" 
            value={form.senderName} 
            onChange={handleChange} 
            style={styles.input} 
            required 
          />
          <label style={styles.label} htmlFor="senderAddress">Address</label>
          <textarea 
            id="senderAddress" 
            name="senderAddress" 
            value={form.senderAddress} 
            onChange={handleChange} 
            style={styles.textarea} 
            required 
          />
          <label style={styles.label} htmlFor="senderPhone">Phone</label>
          <input 
            type="tel" 
            id="senderPhone" 
            name="senderPhone" 
            value={form.senderPhone} 
            onChange={handleChange} 
            style={styles.input} 
            required 
          />
        </div>

        <div>
          <h3 style={styles.sectionTitle}>Receiver Details</h3>
          <label style={styles.label} htmlFor="receiverName">Name</label>
          <input 
            type="text" 
            id="receiverName" 
            name="receiverName" 
            value={form.receiverName} 
            onChange={handleChange} 
            style={styles.input} 
            required 
          />
          <label style={styles.label} htmlFor="receiverAddress">Address</label>
          <textarea 
            id="receiverAddress" 
            name="receiverAddress" 
            value={form.receiverAddress} 
            onChange={handleChange} 
            style={styles.textarea} 
            required 
          />
          <label style={styles.label} htmlFor="receiverPhone">Phone</label>
          <input 
            type="tel" 
            id="receiverPhone" 
            name="receiverPhone" 
            value={form.receiverPhone} 
            onChange={handleChange} 
            style={styles.input} 
            required 
          />
        </div>

        <div>
          <h3 style={styles.sectionTitle}>Package Details</h3>
          <label style={styles.label} htmlFor="packageWeight">Weight (kg)</label>
          <input 
            type="number" 
            id="packageWeight" 
            name="packageWeight" 
            value={form.packageWeight} 
            onChange={handleChange} 
            style={styles.input} 
            min="0" 
            step="0.01" 
            required 
          />
          <label style={styles.label} htmlFor="packageDimensions">Dimensions (L x W x H cm)</label>
          <input 
            type="text" 
            id="packageDimensions" 
            name="packageDimensions" 
            value={form.packageDimensions} 
            onChange={handleChange} 
            style={styles.input} 
            placeholder="e.g., 30x20x15" 
          />
          <label style={styles.label} htmlFor="packageDescription">Description</label>
          <textarea 
            id="packageDescription" 
            name="packageDescription" 
            value={form.packageDescription} 
            onChange={handleChange} 
            style={styles.textarea} 
          />
        </div>

        <div>
          <h3 style={styles.sectionTitle}>Delivery Options</h3>
          <label style={styles.label} htmlFor="deliveryType">Delivery Type</label>
          <select 
            id="deliveryType" 
            name="deliveryType" 
            value={form.deliveryType} 
            onChange={handleChange} 
            style={styles.select}
          >
            <option value="standard">Standard Delivery</option>
            <option value="express">Express Delivery</option>
          </select>
          <label style={styles.label} htmlFor="deliveryDate">Desired Delivery Date</label>
          <input 
            type="date" 
            id="deliveryDate" 
            name="deliveryDate" 
            value={form.deliveryDate} 
            onChange={handleChange} 
            style={styles.input} 
            required 
          />
        </div>

        <button type="submit" style={styles.button}>
          Book Courier
        </button>

      </form>
    </div>
  );
}
