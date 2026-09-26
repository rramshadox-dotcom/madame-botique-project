const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  category: { type: String, enum: ['newArrival', 'sale', 'summer', 'winter', 'accessories'], required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number, default: 0 },
  discount: String,
  img: String,
  desc: String,
  rating: { type: Number, min: 1, max: 5, default: 4 },
  stock: { type: Number, default: 100 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
