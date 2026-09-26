const express = require('express');
const router = express.Router();

const products = [
  { id: 101, category: 'newArrival', title: '2 Pc Co-Ord Set', price: 6590, image: 'new1.webp', rating: 4 },
  { id: 102, category: 'newArrival', title: '3 Pc Embroidered Suit', price: 5210, image: 'new2.webp', rating: 5 },
  { id: 201, category: 'winter', title: '3Pc Embroidered Co-ords', price: 7750, image: 'kaddar2.webp', rating: 5 },
  { id: 301, category: 'summer', title: '3 Pc Printed Lawn Suit', price: 3890, image: 'pic1.webp', rating: 4 },
  { id: 401, category: 'accessories', title: 'Yarn Dyed Muffler', price: 3290, image: 'Muffler.webp', rating: 4 },
  { id: 501, category: 'sale', title: 'Embroidered Lawn Suit', price: 3990, oldPrice: 5990, image: 'pic1.webp', rating: 5 }
];

router.get('/', (req, res) => {
  const { category, search } = req.query;
  const result = products.filter((product) => {
    const categoryMatches = !category || category === 'all' || product.category === category;
    const searchMatches = !search || product.title.toLowerCase().includes(String(search).toLowerCase());
    return categoryMatches && searchMatches;
  });
  res.json(result);
});

router.get('/:id', (req, res) => {
  const product = products.find((item) => item.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

module.exports = router;
