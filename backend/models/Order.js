const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  items: [{
    id: Number,
    title: String,
    price: Number,
    size: String,
    quantity: { type: Number, default: 1 }
  }],
  totalAmount: { type: Number, required: true },
  shippingAddress: String,
  city: String,
  country: String,
  postalCode: String,
  paymentMethod: { type: String, default: 'cash-on-delivery' },
  status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  notes: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
