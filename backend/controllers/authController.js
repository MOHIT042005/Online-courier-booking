const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');

exports.register = async (req, res) => {
  // Your existing registration logic for creating user...

  const verificationToken = crypto.randomBytes(32).toString('hex');
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword, // make sure to hash password
    isVerified: false,
    verificationToken,
  });

  await newUser.save();

  const verificationUrl = `https://your-domain.com/auth/verify-email/${verificationToken}`;

  // Setup nodemailer and send email
  const transporter = nodemailer.createTransport({ 
    // SMTP configuration 
  });

  await transporter.sendMail({
    to: newUser.email,
    subject: 'Verify your email',
    html: `<p>Verify your email by clicking <a href="${verificationUrl}">here</a></p>`,
  });

  res.status(201).send('Registration successful. Please check your email for verification.');
};

exports.verifyEmail = async (req, res) => {
  const user = await User.findOne({ verificationToken: req.params.token });

  if (!user) return res.status(400).send('Invalid or expired token.');

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  res.send('Email verified successfully. You can now login.');
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('User not found.');

  if (!user.isVerified) return res.status(403).send('Please verify your email before logging in.');

  // Password verification & token generation
};
