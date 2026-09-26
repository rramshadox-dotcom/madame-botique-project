const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secret = () => process.env.JWT_SECRET || 'development-only-secret';

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || password.length < 6) {
      return res.status(400).json({ error: 'Name, valid email, and password (min 6 chars) required' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) return res.status(409).json({ error: 'User already exists' });

    const user = new User({ name, email: email.toLowerCase(), password, phone });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, secret(), { expiresIn: '7d' });
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, secret(), { expiresIn: '7d' });
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
