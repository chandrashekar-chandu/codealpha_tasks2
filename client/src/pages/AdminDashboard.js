import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import ProductList from '../components/ProductList';
const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    rating: '',
  });
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.stock || formData.stock < 0) newErrors.stock = 'Valid stock is required';
    if (formData.rating && (formData.rating < 0 || formData.rating > 5)) {
      newErrors.rating = 'Rating must be between 0 and 5';
    }
    if (!photo) newErrors.photo = 'Photo is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('stock', formData.stock);
    formDataToSend.append('rating', formData.rating);
    formDataToSend.append('photo', photo);

    try {
      const response = await fetch('http://localhost:5000/api/products/add', { // Use backend port 5000
        method: 'POST',
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Product added successfully!');
        setFormData({ name: '', description: '', price: '', category: '', stock: '', rating: '' });
        setPhoto(null);
      } else {
        setErrors({ form: data.error || 'Failed to add product' });
        toast.error(data.error || 'Failed to add product');
      }
    } catch (err) {
      console.error('Add product error:', err);
      setErrors({ form: 'An error occurred. Please try again.' });
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      {errors.form && <p className="text-red-500 mb-4">{errors.form}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <textarea
            name="description"
            placeholder="Description"
            className="w-full p-2 border rounded"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            className={`w-full p-2 border rounded ${errors.price ? 'border-red-500' : ''}`}
            value={formData.price}
            onChange={handleChange}
            step="0.01"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="w-full p-2 border rounded"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            className={`w-full p-2 border rounded ${errors.stock ? 'border-red-500' : ''}`}
            value={formData.stock}
            onChange={handleChange}
          />
          {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
        </div>

        <div className="mb-4">
          <input
            type="number"
            name="rating"
            placeholder="Rating (0-5)"
            className={`w-full p-2 border rounded ${errors.rating ? 'border-red-500' : ''}`}
            value={formData.rating}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
          />
          {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
        </div>

        <div className="mb-4">
          <input
            type="file"
            name="photo"
            accept="image/*"
            className={`w-full p-2 border rounded ${errors.photo ? 'border-red-500' : ''}`}
            onChange={handlePhotoChange}
          />
          {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
        </div>

        {/* Image preview */}
        {photo && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(photo)}
              alt="Preview"
              style={{ width: 200, height: 200, objectFit: 'cover' }}
            />
            <p className="text-gray-500 text-sm">Image Preview</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold"
        >
          Add Product
        </button>
      </form>
    
    </div>
  );
};

export default AdminDashboard;