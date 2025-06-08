// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import BuyedItems from './pages/BuyedItems';
import Home from './pages/Home';
import AuthLanding from './pages/AuthLanding';
import { CartProvider } from './contexts/CartContext';

const PrivateRoute = ({ children, isAdmin }) => {
  const token = localStorage.getItem('authToken');
  const domain = localStorage.getItem('domain');
  if (!token) {
    return <Navigate to="/" />;
  }
  if (isAdmin && domain !== 'admin') {
    return <Navigate to="/user/dashboard" />;
  }
  return children;
};

function App() {
  return (
    // Add overflow-x-hidden to prevent unwanted horizontal scrollbars
    <div className="overflow-x-hidden">
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/user/dashboard"
              element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute isAdmin>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/buyed"
              element={
                <PrivateRoute>
                  <BuyedItems />
                </PrivateRoute>
              }
            />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;