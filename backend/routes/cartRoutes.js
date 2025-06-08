// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { addToCart, getCartItems, updateCartItem, removeFromCart } = require('../controllers/cartController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addToCart);
router.get('/:userId', authMiddleware, getCartItems);
router.put('/update', authMiddleware, updateCartItem);
router.delete('/:itemId', authMiddleware, removeFromCart);

module.exports = router;