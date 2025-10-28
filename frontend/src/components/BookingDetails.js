import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const styles = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#5d432c",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  label: {
    fontWeight: "700",
    marginBottom: "0.3rem",
  },
  value: {
    marginBottom: "1.2rem",
    paddingLeft: "1rem",
  },
};

export default function BookingDetails() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/booking/${id}`)
      .then((res) => {
        setBooking(res.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Error fetching data");
        setBooking(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={styles.container}>Loading booking details...</p>;
  if (error) return <p style={styles.container}>Error: {error}</p>;
  if (!booking) return <p style={styles.container}>No booking found</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Booking Details - ID: {booking.id}</h2>

      <div>
        <div style={styles.label}>Sender Name:</div>
        <div style={styles.value}>{booking.senderName}</div>

        <div style={styles.label}>Sender Address:</div>
        <div style={styles.value}>{booking.senderAddress}</div>

        <div style={styles.label}>Sender Phone:</div>
        <div style={styles.value}>{booking.senderPhone}</div>

        <div style={styles.label}>Receiver Name:</div>
        <div style={styles.value}>{booking.receiverName}</div>

        <div style={styles.label}>Receiver Address:</div>
        <div style={styles.value}>{booking.receiverAddress}</div>

        <div style={styles.label}>Receiver Phone:</div>
        <div style={styles.value}>{booking.receiverPhone}</div>

        <div style={styles.label}>Package Weight (Kg):</div>
        <div style={styles.value}>{booking.packageWeight}</div>

        <div style={styles.label}>Package Dimensions (cm):</div>
        <div style={styles.value}>{booking.packageDimensions}</div>

        <div style={styles.label}>Package Description:</div>
        <div style={styles.value}>{booking.packageDescription}</div>

        <div style={styles.label}>Delivery Type:</div>
        <div style={styles.value}>{booking.deliveryType}</div>

        <div style={styles.label}>Delivery Date:</div>
        <div style={styles.value}>{new Date(booking.deliveryDate).toLocaleDateString()}</div>

        <div style={styles.label}>Booking Status:</div>
        <div style={styles.value}>{booking.status || 'Pending'}</div>
      </div>
    </div>
  );
}
