// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const validateSignup = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('mobile').isMobilePhone().withMessage('Invalid mobile number'),
  body('domain').isIn(['user', 'admin']).withMessage('Invalid domain'),
];

const validateLogin = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
  body('domain').isIn(['user', 'admin']).withMessage('Invalid domain'),
];

exports.signup = [
  ...validateSignup,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'Validation failed', details: errors.array() });
      }

      const { name, email, password, mobile, domain } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, email, password: hashedPassword, mobile, domain });
      await user.save();

      const token = jwt.sign({ userId: user._id, email: user.email, domain: user.domain }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(201).json({ message: 'Signup successful', token, userId: user._id, email: user.email, domain });
    } catch (err) {
      res.status(500).json({ error: 'Signup failed' });
    }
  },
];

exports.login = [
  ...validateLogin,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'Validation failed', details: errors.array() });
      }

      const { email, password, domain } = req.body;
      const user = await User.findOne({ email, domain });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id, email: user.email, domain: user.domain }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ message: 'Login successful', token, userId: user._id, email: user.email, domain });
    } catch (err) {
      res.status(500).json({ error: 'Login failed' });
    }
  },
];