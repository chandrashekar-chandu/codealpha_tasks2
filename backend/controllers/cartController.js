const CartItem = require('../models/CartItem');

exports.addToCart = async (req, res) => {
  try {
    const { userId, name, category, price, rating, quantity, photo } = req.body;
    // Find if the item already exists in the user's cart
    let item = await CartItem.findOne({ userId, name });
    if (item) {
      item.quantity += quantity || 1;
      await item.save();
      return res.status(200).json({ message: 'Item quantity updated' });
    }
    // Save photo field as well
    item = new CartItem({
      userId,
      name,
      category,
      price,
      rating,
      quantity: quantity || 1,
      photo // <-- This ensures the image path is saved
    });
    await item.save();
    res.status(201).json({ message: 'Item added to cart' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to add to cart' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.itemId);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to remove item' });
  }
};

exports.updateCartItem = async (req, res) => {
  res.status(501).json({ message: 'Not implemented' });
};

exports.getCartItems = async (req, res) => {
  try {
    const userId = req.params.userId;
    const items = await CartItem.find({ userId });
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: 'Failed to fetch cart items' });
  }
};