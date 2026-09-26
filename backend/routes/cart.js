const express = require('express');
const router = express.Router();

router.post('/save', async (_req, res) => {
  res.json({ message: 'Cart functionality handled by frontend localStorage' });
});

module.exports = router;
