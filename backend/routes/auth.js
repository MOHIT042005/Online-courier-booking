const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const DeepEmailValidator = require('deep-email-validator');

const router = express.Router();

// JWT generation utility
const generateToken = (user, secret, expiresIn) => {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    secret,
    { expiresIn }
  );
};

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAILUSER,
    pass: process.env.EMAILPASS,
  },
});

// Robust email validation utility
async function isEmailValid(email) {
  return await DeepEmailValidator.validate(email);
}

// Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    // Email validation
    const { valid } = await isEmailValid(email);
    if (!valid) {
      return res.status(400).json({ message: 'Incorrect email id given' });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // expires in 15 min

    const newUser = await User.create({
      username,
      email,
      password: hashed,
      isVerified: false,
      verificationOTP: otp,
      otpExpires,
    });

    // Send OTP email
    const mailOptions = {
      from: '"Online Courier Booking" <OCB@gmail.com>',
      to: newUser.email,
      subject: 'Email Verification OTP',
      html: `<p>Your email verification password for Online courier booking is <strong>${otp}</strong></p>`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      message: 'Registration successful. Please check your email for the OTP to verify your account.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// OTP verification route
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'User not found.' });

    if (user.isVerified)
      return res.status(400).json({ message: 'Email already verified.' });

    if (user.verificationOTP !== otp)
      return res.status(400).json({ message: 'Invalid OTP.' });

    if (user.otpExpires < new Date())
      return res.status(400).json({ message: 'OTP expired. Please request a new one.' });

    user.isVerified = true;
    user.verificationOTP = null;
    user.otpExpires = null;
    await user.save();

    res.json({ message: 'Email verified successfully. You can now login.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during OTP verification.' });
  }
});

// Resend OTP route
router.post('/resend-otp', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'User not found.' });

    if (user.isVerified)
      return res.status(400).json({ message: 'Email already verified.' });

    // Generate new OTP and expiry
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const newOtpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    user.verificationOTP = newOtp;
    user.otpExpires = newOtpExpires;
    await user.save();

    await transporter.sendMail({
      from: '"Online Courier Booking" <OCB@gmail.com>',
      to: user.email,
      subject: 'Resend Email Verification OTP',
      html: `<p>Your new email verification password for Online Courier Booking is <strong>${newOtp}</strong></p>`,
    });

    res.json({ message: 'New OTP sent to your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while resending OTP.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Login attempt:', email);
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('No user found for:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log('User found:', user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' });

    // Add secret logging for debugging
    console.log('JWTSECRET:', process.env.JWTSECRET);
    console.log('REFRESHSECRET:', process.env.REFRESHSECRET);

    const accessToken = generateToken(user, process.env.JWTSECRET, '15m');
    const refreshToken = generateToken(user, process.env.REFRESHSECRET, '7d');

    res.json({ accessToken, refreshToken, user: { id: user.id, username: user.username, email } });
  } catch (error) {
    console.log('Error in login route:');
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Refresh Token Endpoint
router.post('/refresh-token', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ message: 'No token provided' });

  jwt.verify(refreshToken, process.env.REFRESHSECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' });
    const accessToken = generateToken(user, process.env.JWTSECRET, '15m');
    res.json({ accessToken });
  });
});

module.exports = router;
