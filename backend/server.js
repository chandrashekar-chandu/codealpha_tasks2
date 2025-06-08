// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const buyedRoutes = require('./routes/buyedRoutes');
const productRoutes = require('./routes/productRoutes');

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true }));
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/buyed', buyedRoutes);
app.use('/api/products', productRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(5000, () => {
      console.log('🚀 Server is running on port 5000');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed', err);
  });