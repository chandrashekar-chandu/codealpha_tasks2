import React from "react";
import { Link } from "react-router-dom";

export default function AuthLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      {/* Navbar */}
      <nav className="bg-white/90 shadow-lg sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-indigo-700 tracking-tight">ShopEase</h1>
          <div className="flex gap-6 text-base font-medium">
            <Link to="/home" className="hover:text-indigo-600 transition">Home</Link>
            <Link to="/cart" className="hover:text-indigo-600 transition">Cart</Link>
            <Link to="/buyed" className="hover:text-indigo-600 transition">Buyed Items</Link>
            <Link to="/login" className="hover:text-indigo-600 transition">Login</Link>
            <Link to="/signup" className="hover:text-indigo-600 transition">Signup</Link>
          </div>
        </div>
      </nav>

      {/* Landing Content */}
      <section className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center text-center">
        <h2 className="text-5xl font-extrabold text-indigo-700 mb-6">Welcome to ShopEase</h2>
        <p className="text-xl text-gray-700 mb-8">
          Your one-stop shop for the best products and deals. Start your shopping journey now!
        </p>
        <Link
          to="/home"
          className="bg-indigo-500 text-white px-8 py-4 rounded-lg font-semibold shadow hover:bg-indigo-600 transition text-lg"
        >
          Enter Shop
        </Link>
      </section>
    </div>
  );
}