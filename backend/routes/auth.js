const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = new Map();
const secret = () => process.env.JWT_SECRET || 'development-only-secret';

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 6) {
    return res.status(400).json({ error: 'Name, valid email, and a password of at least 6 characters are required' });
  }
  const normalizedEmail = email.toLowerCase().trim();
  if (users.has(normalizedEmail)) return res.status(409).json({ error: 'User already exists' });
  const user = { id: crypto.randomUUID?.() || String(Date.now()), name, email: normalizedEmail, password: await bcrypt.hash(password, 12) };
  users.set(normalizedEmail, user);
  res.status(201).json({ token: jwt.sign({ id: user.id, email: user.email }, secret(), { expiresIn: '7d' }), user: { id: user.id, name, email: normalizedEmail } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.get(String(email || '').toLowerCase().trim());
  if (!user || !(await bcrypt.compare(password || '', user.password))) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ token: jwt.sign({ id: user.id, email: user.email }, secret(), { expiresIn: '7d' }), user: { id: user.id, name: user.name, email: user.email } });
});

module.exports = router;
