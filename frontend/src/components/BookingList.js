import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const styles = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#5d432c",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    borderBottom: "2px solid #7f5a24",
    padding: "12px 10px",
    textAlign: "left",
    backgroundColor: "#f3e8d0",
    color: "#5d432c",
  },
  td: {
    borderBottom: "1px solid #ddd",
    padding: "10px",
    color: "#6b5a40",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1rem",
    color: "#7f5a24",
    fontWeight: "700",
    fontSize: "1.5rem",
  },
  noBookings: {
    textAlign: "center",
    color: "#a67c00",
    fontWeight: "600",
    marginTop: "2rem",
  },
  link: {
    color: "#7f5a24",
    textDecoration: "none",
    fontWeight: "600",
  },
  linkHover: {
    textDecoration: "underline",
    cursor: "pointer",
  },
};

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/booking/mybookings")
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={styles.noBookings}>Loading bookings...</p>;

  if (bookings.length === 0)
    return <p style={styles.noBookings}>No bookings found.</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Your Bookings</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Booking ID</th>
            <th style={styles.th}>Sender</th>
            <th style={styles.th}>Receiver</th>
            <th style={styles.th}>Weight (Kg)</th>
            <th style={styles.th}>Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td style={styles.td}>
                <Link
                  to={`/booking/${b.id}`}
                  style={styles.link}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.textDecoration = styles.linkHover.textDecoration)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                >
                  {b.id}
                </Link>
              </td>
              <td style={styles.td}>{b.senderName}</td>
              <td style={styles.td}>{b.receiverName}</td>
              <td style={styles.td}>{b.packageWeight}</td>
              <td style={styles.td}>
                {new Date(b.deliveryDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
