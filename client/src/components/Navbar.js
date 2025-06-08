import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaShoppingCart, FaBoxOpen, FaSignInAlt, FaUserPlus, FaStore, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/user/dashboard", label: "Shop", icon: <FaStore /> },
    { to: "/cart", label: "Cart", icon: <FaShoppingCart /> },
    { to: "/buyed", label: "Buyed Items", icon: <FaBoxOpen /> },
    { to: "/login", label: "Login", icon: <FaSignInAlt /> },
    { to: "/signup", label: "Signup", icon: <FaUserPlus /> },
  ];

  return (
    <nav
      className="w-full"
      style={{
        background: "linear-gradient(90deg, #232526 0%, #414345 100%)",
        borderBottom: "2px solid #BCAA99",
        boxShadow: "0 4px 24px 0 #A4A9AD44",
        borderRadius: "0px",
        margin: "0",
      }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-3 flex flex-wrap justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <img
            src="https://img.icons8.com/color/48/000000/shopping-cart.png"
            alt="ShopEase Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow flex-shrink-0"
            style={{
              border: "2px solid #BCAA99",
              background: "#fff",
            }}
          />
          <span
            className="text-lg sm:text-2xl font-extrabold tracking-tight truncate"
            style={{
              color: "#F5F5F7",
              letterSpacing: "2px",
              textShadow: "0 2px 8px #23252644",
            }}
          >
            ShopEase
          </span>
        </div>
        {/* Hamburger for mobile */}
        <button
          className="sm:hidden text-[#BCAA99] text-2xl focus:outline-none ml-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        {/* Desktop Nav */}
        <div className="hidden sm:flex gap-1 md:gap-2 text-base font-medium items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
                location.pathname === link.to
                  ? "bg-[#BCAA99] text-[#232526] font-bold shadow-lg"
                  : "text-[#F5F5F7] hover:bg-[#BCAA99] hover:text-[#232526]"
              }`}
              style={{
                fontWeight: location.pathname === link.to ? 700 : 500,
                border: location.pathname === link.to ? "2px solid #F5F5F7" : "none",
                boxShadow: location.pathname === link.to ? "0 2px 8px #BCAA9944" : "none",
                transition: "all 0.2s",
              }}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
      {/* Mobile Nav */}
      {menuOpen && (
        <div className="sm:hidden px-2 pb-3">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-200 text-base ${
                  location.pathname === link.to
                    ? "bg-[#BCAA99] text-[#232526] font-bold shadow-lg"
                    : "text-[#F5F5F7] hover:bg-[#BCAA99] hover:text-[#232526]"
                }`}
                style={{
                  fontWeight: location.pathname === link.to ? 700 : 500,
                  border: location.pathname === link.to ? "2px solid #F5F5F7" : "none",
                  boxShadow: location.pathname === link.to ? "0 2px 8px #BCAA9944" : "none",
                  transition: "all 0.2s",
                }}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}