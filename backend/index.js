const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Online Courier Booking API is running');
});

// Mount auth routes
app.use('/api/auth', authRoutes);

// Connect to database and sync models
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connected and synced successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
