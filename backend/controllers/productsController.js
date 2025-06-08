const Product = require('../models/Product');
const upload = require('../middleware/upload');

// Add a new product (with photo)
exports.addProduct = [
  upload.single('photo'), // Handle single image upload
  async (req, res) => {
    try {
      const { name, description, price, category, stock, rating } = req.body;
      // Always set photo to a string (or null if not uploaded)
      const photo = req.file ? `/uploads/${req.file.filename}` : null;

      const product = new Product({
        name,
        description,
        price,
        category,
        stock,
        rating: rating || 0,
        photo,
      });

      await product.save();
      // Return the full product object, including the photo path
      res.status(201).json({ message: 'Product added successfully', product });
    } catch (err) {
      console.error('Add product error:', err.message);
      res.status(500).json({ error: 'Failed to add product', details: err.message });
    }
  },
];

// Get all products
exports.getProducts = async (req, res) => {
  try {
    // Always include the photo field in the response
    const products = await Product.find().select('name rating photo price category stock');
    // Optionally, you can map the photo field to include the full URL if needed:
    // const productsWithFullPhotoUrl = products.map(p => ({
    //   ...p._doc,
    //   photo: p.photo ? `http://localhost:5000${p.photo}` : null
    // }));
    // res.json(productsWithFullPhotoUrl);

    res.json(products);
  } catch (err) {
    console.error('Get products error:', err.message);
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
};