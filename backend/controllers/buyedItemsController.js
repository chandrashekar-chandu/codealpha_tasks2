// controllers/buyedItemsController.js
const BuyedItem = require('../models/BuyedItem');

exports.addBuyedItem = async (req, res) => {
  try {
    const { userId, name, category, price, rating, photo } = req.body;
    const item = new BuyedItem({
      userId,
      name,
      category,
      price,
      rating,
      photo // <-- This ensures the image path is saved
    });
    await item.save();
    res.status(201).json({ message: 'Item marked as buyed' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to add buyed item' });
  }
};

exports.getBuyedItems = async (req, res) => {
  try {
    const items = await BuyedItem.find({ userId: req.params.userId });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch buyed items' });
  }
};