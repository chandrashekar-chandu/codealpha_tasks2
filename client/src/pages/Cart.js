import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import Navbar from '../components/Navbar';

const Cart = () => {
  const { cart, setCart, removeFromCart, updateQuantity } = useCart();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    // Fetch cart items from backend
    const fetchCartItems = async () => {
      if (!userId || !token) return;
      try {
        const response = await fetch(`/api/cart/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setCart(data);
        }
      } catch (err) {}
    };
    fetchCartItems();
  }, [userId, token, setCart]);

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div style={{ background: "#181e27", minHeight: "100vh" }}>
      <Navbar />
      <div className="max-w-4xl mx-auto p-2 sm:p-6 w-full">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-6 sm:mb-8" style={{ color: "#fff" }}>
          🛒 Your Cart
        </h2>
        {cart.length === 0 ? (
          <p className="text-gray-400">Your cart is empty.</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-center border border-gray-800 rounded-2xl p-3 sm:p-4 bg-[#232f3e] shadow-lg"
                >
                  {item.photo && (
                    <img
                      src={`http://localhost:5000${item.photo}`}
                      alt={item.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl mb-3 sm:mb-0 sm:mr-4"
                      style={{ background: "#181e27" }}
                    />
                  )}
                  <div className="flex-1 w-full">
                    <h3 className="font-bold text-base sm:text-lg mb-1" style={{ color: "#fff" }}>{item.name}</h3>
                    <p className="text-gray-300 text-sm sm:text-base">Price: ₹{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, Math.max((item.quantity || 1) - 1, 1))
                        }
                        className="px-2 py-1 bg-gray-700 text-white rounded"
                      >
                        -
                      </button>
                      <span className="text-white">{item.quantity || 1}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, (item.quantity || 1) + 1)
                        }
                        className="px-2 py-1 bg-gray-700 text-white rounded"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="mt-2 text-red-400 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-right">
              <span className="font-bold text-lg sm:text-xl" style={{ color: "#f7b42c" }}>
                Total: ₹{getTotal().toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;