import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Dialog } from '@headlessui/react';
import Navbar from '../components/Navbar';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [buyingProduct, setBuyingProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products', {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        });
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        toast.error('Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { key: 'all', label: '🌟 All' },
    { key: 'book', label: '📚 Books' },
    { key: 'electronics', label: '💻 Electronics' },
    { key: 'gaming', label: '🎮 Gaming' },
    { key: 'fashion', label: '👕 Fashion' },
    { key: 'stationery', label: '✏️ Stationery' },
    { key: 'home', label: '🏠 Home & Living' },
  ];

  const filteredProducts = products
    .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => p.rating >= minRating)
    .filter((p) => p.price <= maxPrice);

  const handleAddToCart = (product) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Please login to add items to cart');
      setTimeout(() => navigate('/login'), 1000);
      return;
    }
    addToCart(product, userId);
    toast.success('Added to cart!');
  };

  const handleBuyClick = (product) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Please login to buy items');
      setTimeout(() => navigate('/login'), 1000);
      return;
    }
    setBuyingProduct(product);
  };

  const handleBuy = async (product) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      toast.error('Please login to buy items');
      setTimeout(() => navigate('/login'), 1000);
      return;
    }
    try {
      const response = await fetch('/api/buyed/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...product, userId, photo: product.photo }),
      });

      if (response.status === 401) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('authToken');
        setTimeout(() => navigate('/login'), 1000);
        return;
      }

      if (response.ok) {
        toast.success(`Successfully bought ${product.name}`);
        setBuyingProduct(null);
      } else {
        toast.error('Failed to buy item');
      }
    } catch (err) {
      toast.error('An error occurred');
    }
  };

  return (
    <div style={{ background: "#181e27", minHeight: "100vh" }}>
      <Toaster />
      <Navbar />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            🛍️ Products
          </h2>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Search by name..."
              className="border border-gray-700 bg-[#232f3e] text-white px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 outline-none transition w-full sm:w-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              className="border border-gray-700 bg-[#232f3e] text-white px-3 py-2 rounded-lg shadow-sm w-24 sm:w-32 focus:ring-2 focus:ring-yellow-400 outline-none transition"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <select
              className="border border-gray-700 bg-[#232f3e] text-white px-3 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 outline-none transition"
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
            >
              {[0, 3, 4, 4.5].map((r) => (
                <option key={r} value={r}>{r}+ stars</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow transition border-2 text-sm sm:text-base ${
                selectedCategory === cat.key
                  ? "bg-[#f7b42c] border-yellow-400 text-[#181e27] scale-105"
                  : "bg-[#232f3e] border-gray-700 text-white hover:scale-105"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center text-gray-400 text-lg sm:text-xl py-12">
              No products found.
            </div>
          )}
          {filteredProducts.map((p) => (
            <div
              key={p._id}
              className="rounded-2xl shadow-lg hover:shadow-2xl transition hover:-translate-y-1 border border-gray-800 flex flex-col bg-[#232f3e]"
            >
              {p.photo && (
                <img
                  src={`http://localhost:5000${p.photo}`}
                  alt={p.name}
                  className="w-full h-44 sm:h-56 object-cover rounded-t-2xl"
                  style={{ background: "#181e27" }}
                />
              )}
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <h4 className="font-bold text-base sm:text-lg mb-1 text-white">{p.name}</h4>
                <p className="text-xs sm:text-sm text-gray-300 capitalize mb-2">{p.category}</p>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(p.rating) ? 'text-yellow-400' : 'text-gray-700'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-400 ml-1">({p.rating})</span>
                </div>
                <p className="mt-1 text-lg sm:text-xl font-semibold mb-4" style={{ color: "#f7b42c" }}>₹{p.price}</p>
                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => handleAddToCart(p)}
                    className="flex-1 bg-[#f7b42c] text-[#181e27] px-3 py-2 rounded-lg font-semibold shadow hover:bg-yellow-400 transition text-xs sm:text-base"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleBuyClick(p)}
                    className="flex-1 bg-[#232f3e] border border-[#f7b42c] text-[#f7b42c] px-3 py-2 rounded-lg font-semibold shadow hover:bg-[#f7b42c] hover:text-[#181e27] transition text-xs sm:text-base"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {buyingProduct && (
        <Dialog open={true} onClose={() => setBuyingProduct(null)} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <Dialog.Panel className="bg-[#232f3e] rounded-xl shadow-lg max-w-md w-full p-6">
              <Dialog.Title className="text-lg sm:text-xl font-bold mb-4 text-white">
                Confirm Purchase
              </Dialog.Title>
              {buyingProduct.photo && (
                <img
                  src={`http://localhost:5000${buyingProduct.photo}`}
                  alt={buyingProduct.name}
                  className="w-32 h-32 sm:w-44 sm:h-44 object-cover mx-auto mb-4 rounded-xl"
                  style={{ background: "#181e27" }}
                />
              )}
              <p className="text-white mb-2">
                You are buying: <strong>{buyingProduct.name}</strong>
              </p>
              <p className="text-[#f7b42c] font-semibold mb-4">Price: ₹{buyingProduct.price}</p>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setBuyingProduct(null)}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleBuy(buyingProduct)}
                  className="px-4 py-2 bg-[#f7b42c] text-[#181e27] rounded hover:bg-yellow-400 font-bold"
                >
                  Confirm
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default UserDashboard;