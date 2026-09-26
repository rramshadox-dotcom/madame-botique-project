const express = require('express');
const router = express.Router();
const orders = [];

router.post('/', (req, res) => {
  const { items, customer, shippingAddress } = req.body;
  if (!Array.isArray(items) || items.length === 0 || !customer || !shippingAddress) {
    return res.status(400).json({ error: 'Items, customer, and shipping address are required' });
  }
  const order = { id: `MB-${Date.now()}`, items, customer, shippingAddress, status: 'pending', createdAt: new Date().toISOString() };
  orders.push(order);
  res.status(201).json(order);
});

router.get('/', (_req, res) => res.json(orders));

module.exports = router;
