// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { addProduct, getProducts } = require('../controllers/productsController');

router.post('/add', addProduct);
router.get('/', getProducts);

module.exports = router;