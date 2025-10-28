const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Middleware: check if token exists and is valid
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access token missing" });

  jwt.verify(token, process.env.JWTSECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

// Example protected route
router.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: `Welcome ${req.user.username}!`,
    role: req.user.role,
  });
});

module.exports = router;
