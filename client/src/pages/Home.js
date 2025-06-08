import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  // Scroll to categories section
  const handleExploreClick = () => {
    const categoriesSection = document.getElementById("categories-section");
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #232526 0%, #414345 100%)" }}>
      {/* Navbar */}
      <Navbar />

      {/* Landing/Intro Section */}
      <section
        className="w-full py-16 sm:py-20 flex flex-col items-center justify-center text-center px-2"
        style={{
          background: "linear-gradient(90deg, #232526 0%, #414345 100%)",
          color: "#F5F5F7",
        }}
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">Welcome to ShopEase</h1>
        <p className="text-base sm:text-xl mb-8 max-w-2xl text-[#BCAA99]">
          Your one-stop destination for the latest trends, best deals, and a seamless shopping experience.
        </p>
        <button
          onClick={handleExploreClick}
          className="bg-[#BCAA99] text-[#232526] px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-bold text-base sm:text-lg shadow hover:bg-[#e0ddcf] transition"
        >
          Explore Categories
        </button>
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
        <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center" style={{ color: "#F5F5F7" }}>
          Why Choose ShopEase?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
          <div className="bg-[#232526] rounded-xl shadow p-6 sm:p-8 flex flex-col items-center border border-[#BCAA99]">
            <span className="text-4xl sm:text-5xl mb-4">🚚</span>
            <h4 className="font-bold mb-2 text-[#BCAA99]">Fast Delivery</h4>
            <p className="text-[#e0ddcf]">Get your products delivered at lightning speed, right to your doorstep.</p>
          </div>
          <div className="bg-[#232526] rounded-xl shadow p-6 sm:p-8 flex flex-col items-center border border-[#BCAA99]">
            <span className="text-4xl sm:text-5xl mb-4">💸</span>
            <h4 className="font-bold mb-2 text-[#BCAA99]">Best Prices</h4>
            <p className="text-[#e0ddcf]">Unbeatable deals and discounts on all your favorite products.</p>
          </div>
          <div className="bg-[#232526] rounded-xl shadow p-6 sm:p-8 flex flex-col items-center border border-[#BCAA99]">
            <span className="text-4xl sm:text-5xl mb-4">🔒</span>
            <h4 className="font-bold mb-2 text-[#BCAA99]">Secure Shopping</h4>
            <p className="text-[#e0ddcf]">Shop with confidence with our secure payment and privacy protection.</p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories-section" className="max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-10">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center" style={{ color: "#F5F5F7" }}>
          Shop by Category
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#232526] rounded-xl shadow p-4 sm:p-6 flex flex-col items-center hover:scale-105 transition border border-[#BCAA99]">
            <span className="text-3xl sm:text-4xl mb-2">👕</span>
            <span className="font-semibold text-[#BCAA99]">Clothing</span>
          </div>
          <div className="bg-[#232526] rounded-xl shadow p-4 sm:p-6 flex flex-col items-center hover:scale-105 transition border border-[#BCAA99]">
            <span className="text-3xl sm:text-4xl mb-2">📱</span>
            <span className="font-semibold text-[#BCAA99]">Electronics</span>
          </div>
          <div className="bg-[#232526] rounded-xl shadow p-4 sm:p-6 flex flex-col items-center hover:scale-105 transition border border-[#BCAA99]">
            <span className="text-3xl sm:text-4xl mb-2">🏠</span>
            <span className="font-semibold text-[#BCAA99]">Home</span>
          </div>
          <div className="bg-[#232526] rounded-xl shadow p-4 sm:p-6 flex flex-col items-center hover:scale-105 transition border border-[#BCAA99]">
            <span className="text-3xl sm:text-4xl mb-2">🎮</span>
            <span className="font-semibold text-[#BCAA99]">Gaming</span>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-10">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center" style={{ color: "#F5F5F7" }}>
          Featured Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Example featured product cards */}
          <div className="bg-[#232526] rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center border border-[#BCAA99]">
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"
              alt="Product"
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl mb-4"
            />
            <h4 className="font-bold text-base sm:text-lg mb-2 text-[#BCAA99]">Trendy T-Shirt</h4>
            <p className="text-green-400 font-semibold mb-2">₹499</p>
            <Link
              to="/user/dashboard"
              className="bg-[#BCAA99] text-[#232526] px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-[#e0ddcf] transition"
            >
              Shop Now
            </Link>
          </div>
          <div className="bg-[#232526] rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center border border-[#BCAA99]">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80"
              alt="Product"
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl mb-4"
            />
            <h4 className="font-bold text-base sm:text-lg mb-2 text-[#BCAA99]">Smartphone</h4>
            <p className="text-green-400 font-semibold mb-2">₹12,999</p>
            <Link
              to="/user/dashboard"
              className="bg-[#BCAA99] text-[#232526] px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-[#e0ddcf] transition"
            >
              Shop Now
            </Link>
          </div>
          <div className="bg-[#232526] rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col items-center border border-[#BCAA99]">
            <img
              src="https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80"
              alt="Product"
              className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl mb-4"
            />
            <h4 className="font-bold text-base sm:text-lg mb-2 text-[#BCAA99]">Gaming Console</h4>
            <p className="text-green-400 font-semibold mb-2">₹29,999</p>
            <Link
              to="/user/dashboard"
              className="bg-[#BCAA99] text-[#232526] px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-[#e0ddcf] transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center" style={{ color: "#F5F5F7" }}>
          About ShopEase
        </h3>
        <p className="text-center max-w-2xl mx-auto text-sm sm:text-base" style={{ color: "#e0ddcf" }}>
          ShopEase is dedicated to bringing you the best online shopping experience. From fashion to electronics, we curate the best products at the best prices, delivered fast and securely. Join thousands of happy customers and discover why ShopEase is your favorite online store!
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-10">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center" style={{ color: "#F5F5F7" }}>
          What Our Customers Say
        </h3>
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8 justify-center">
          <div className="bg-[#232526] rounded-xl shadow p-4 sm:p-6 flex-1 border border-[#BCAA99]">
            <p className="italic mb-2 text-[#e0ddcf] text-sm sm:text-base">
              "Amazing shopping experience! Fast delivery and great products."
            </p>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#BCAA99]">- Priya</span>
              <span className="text-yellow-400">★★★★★</span>
            </div>
          </div>
          <div className="bg-[#232526] rounded-xl shadow p-4 sm:p-6 flex-1 border border-[#BCAA99]">
            <p className="italic mb-2 text-[#e0ddcf] text-sm sm:text-base">
              "Customer support was very helpful. Highly recommend ShopEase!"
            </p>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#BCAA99]">- Rahul</span>
              <span className="text-yellow-400">★★★★★</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center" style={{ color: "#F5F5F7" }}>
          Contact Us
        </h3>
        <p className="text-center mb-4 text-sm sm:text-base" style={{ color: "#e0ddcf" }}>
          Have questions or feedback? Reach out to us at{" "}
          <a href="mailto:chandrashekhar7215@gmail.com" className="text-[#BCAA99] underline">
            chandrashekhar7215@gmail.com
          </a>
        </p>
        <div className="flex justify-center">
          <a
            href="mailto:chandrashekhar7215@gmail.com"
            className="bg-[#BCAA99] text-[#232526] px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow hover:bg-[#e0ddcf] transition"
          >
            Email Us
          </a>
        </div>
      </section>
    </div>
  );
}