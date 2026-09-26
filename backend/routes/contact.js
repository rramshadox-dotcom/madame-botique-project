const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message required' });
    }

    const contact = new Contact({ name, email, phone, subject: subject || 'General Inquiry', message });
    await contact.save();

    if (process.env.EMAIL_USER && process.env.ADMIN_EMAIL) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL,
          subject: `New Message: ${subject || 'General Inquiry'}`,
          html: `<p><strong>${name}</strong> (${email}) ${phone ? `- ${phone}` : ''}</p><p>${message}</p>`
        });
      } catch (error) {
        console.error('Email error:', error);
      }
    }

    res.status(201).json({ message: 'Thank you! We will contact you soon.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
