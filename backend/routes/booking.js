const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/create", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const bookingData = { ...req.body, userId };
    const booking = await Booking.create(bookingData);
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/booking/:id - Get booking details by ID (must be owner)
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id;

    const booking = await Booking.findOne({
      where: { id: bookingId, userId: userId },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    console.error("Error fetching booking details:", error);
    res.status(500).json({ message: "Server error fetching booking details" });
  }
});


module.exports = router;
