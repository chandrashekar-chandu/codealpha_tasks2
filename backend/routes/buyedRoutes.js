// routes/buyedRoutes.js
const express = require('express');
const router = express.Router();
const { addBuyedItem, getBuyedItems } = require('../controllers/buyedItemsController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addBuyedItem);
router.get('/:userId', authMiddleware, getBuyedItems);

module.exports = router;