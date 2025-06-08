const mongoose = require('mongoose');

const buyedItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  photo: { type: String }, // <-- Add this line
  purchasedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BuyedItem', buyedItemSchema);