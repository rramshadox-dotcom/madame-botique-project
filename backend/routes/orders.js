const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const User = require('../models/User');
const { sendOrderEmail, sendAdminNotification } = require('../services/emailService');
const { sendWhatsAppMessage, orderConfirmationMessage } = require('../services/whatsappService');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'development-only-secret');
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, shippingAddress, city, country, postalCode, notes, phone } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!items || items.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    const totalAmount = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const orderNumber = `MB-${Date.now()}-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;

    const order = new Order({
      orderNumber,
      user: req.userId,
      email: user.email,
      phone: phone || user.phone,
      items,
      totalAmount,
      shippingAddress,
      city,
      country,
      postalCode,
      notes
    });

    await order.save();
    await sendOrderEmail(order, user.email);
    await sendAdminNotification(order);

    if (phone || user.phone) {
      await sendWhatsAppMessage(phone || user.phone, orderConfirmationMessage(order));
    }

    res.status(201).json({ message: 'Order placed successfully!', order: { id: order._id, orderNumber: order.orderNumber } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:orderId', verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order || order.user.toString() !== req.userId) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
