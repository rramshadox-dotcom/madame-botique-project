const express = require('express');
const router = express.Router();
const messages = [];

router.post('/', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Name, email, and message are required' });
  messages.push({ name, email, subject: subject || 'General inquiry', message, createdAt: new Date().toISOString() });
  res.status(201).json({ message: 'Thank you. We will contact you soon.' });
});

module.exports = router;
