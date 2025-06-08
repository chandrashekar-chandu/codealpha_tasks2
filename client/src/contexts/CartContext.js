import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fetch cart from backend
  const fetchCart = async () => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    if (!token || !userId) return;
    try {
      const res = await fetch(`/api/cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch {
      // Optionally handle error
    }
  };

  // Add to Cart: always send photo field
  const addToCart = async (item, userId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please login to add items to cart');
      return;
    }
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...item, userId, photo: item.photo }), // ensure photo is sent
      });
      if (response.status === 401) {
        alert('Session expired. Please login again.');
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        return;
      }
      if (response.ok) {
        await fetchCart(); // Always fetch latest cart from backend
      } else {
        alert('Failed to add to cart');
      }
    } catch {
      alert('An error occurred');
    }
  };

  // Remove from Cart: call backend and update state
  const removeFromCart = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
      await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCart(); // Always fetch latest cart from backend
    } catch {
      alert('Failed to remove item from cart');
    }
  };

  // Update quantity (frontend only, you can extend to backend if needed)
  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity } : item
      )
    );
  };

  // Optionally, fetch cart on mount
  React.useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQuantity, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};