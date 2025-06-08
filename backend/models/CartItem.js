// models/cartItem.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  photo: { type: String }, // <-- add this line
});

module.exports = mongoose.model('CartItem', cartItemSchema);