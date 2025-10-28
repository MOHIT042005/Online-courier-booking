require('dotenv').config(); // Always FIRST

const express = require('express');
const cors = require('cors');

const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const bookingRoutes = require('./routes/booking');
const Booking = require("./models/Booking"); // Register Booking model

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Online Courier Booking API is running');
});

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/booking', bookingRoutes);

// Connect to database and sync models
(async () => {
  try {
    await sequelize.authenticate(); // Test DB credentials
    await sequelize.sync({ alter: true }); // Will auto-create missing tables/columns
    console.log('Database connected and synced successfully');
    // Start server after DB is ready
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
