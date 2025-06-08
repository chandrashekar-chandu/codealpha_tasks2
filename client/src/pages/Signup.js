import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaEnvelope, FaLock, FaMobileAlt, FaUserShield } from 'react-icons/fa';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    domain: 'user',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Signup successful!');
        localStorage.setItem('domain', form.domain);
        setTimeout(() => {
          if (form.domain === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/user/dashboard');
          }
        }, 1200);
      } else {
        toast.error(data.error || 'Signup failed');
      }
    } catch {
      toast.error('Network error');
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center transition-all duration-1000 relative font-sans bg-gradient-to-br from-[#f5f5f7] via-[#e0ddcf] to-[#fffbe6] px-2"
      // px-2 for mobile padding
    >
      <Toaster />
      {/* Floating icons */}
      <FaUserPlus className="hidden sm:block absolute left-4 sm:left-10 top-6 sm:top-10 text-[#BCAA99] text-4xl sm:text-6xl animate-float-slow pointer-events-none opacity-60" />
      <FaEnvelope className="hidden sm:block absolute right-6 sm:right-16 top-16 sm:top-24 text-[#BCAA99] text-3xl sm:text-5xl animate-float pointer-events-none opacity-60" />
      <FaLock className="hidden sm:block absolute left-6 sm:left-16 bottom-16 sm:bottom-24 text-[#BCAA99] text-3xl sm:text-5xl animate-float-rev pointer-events-none opacity-60" />
      <FaMobileAlt className="hidden sm:block absolute right-4 sm:right-10 bottom-6 sm:bottom-10 text-[#BCAA99] text-4xl sm:text-6xl animate-float-slow pointer-events-none opacity-60" />
      <div className="relative z-10 w-full max-w-md px-0 sm:px-0">
        <div className="bg-white/90 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-10 animate-fade-in border border-[#BCAA99]">
          <div className="flex flex-col items-center mb-6">
            <FaUserPlus className="text-3xl sm:text-4xl text-[#BCAA99] animate-bounce" />
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#534B52] mt-2 mb-1 tracking-tight drop-shadow text-center">Create Account</h2>
            <p className="text-[#BCAA99] font-medium text-xs sm:text-sm text-center">Join our vibrant community!</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="relative">
              <FaUserPlus className="absolute left-3 top-3 text-[#BCAA99] text-base sm:text-lg" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#BCAA99] bg-[#f5f5f7] focus:ring-2 focus:ring-[#BCAA99] outline-none transition placeholder-[#BCAA99] font-semibold text-sm sm:text-base"
                required
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-[#BCAA99] text-base sm:text-lg" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#BCAA99] bg-[#f5f5f7] focus:ring-2 focus:ring-[#BCAA99] outline-none transition placeholder-[#BCAA99] font-semibold text-sm sm:text-base"
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-[#BCAA99] text-base sm:text-lg" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#BCAA99] bg-[#f5f5f7] focus:ring-2 focus:ring-[#BCAA99] outline-none transition placeholder-[#BCAA99] font-semibold text-sm sm:text-base"
                required
              />
            </div>
            <div className="relative">
              <FaMobileAlt className="absolute left-3 top-3 text-[#BCAA99] text-base sm:text-lg" />
              <input
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="Mobile"
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#BCAA99] bg-[#f5f5f7] focus:ring-2 focus:ring-[#BCAA99] outline-none transition placeholder-[#BCAA99] font-semibold text-sm sm:text-base"
                required
              />
            </div>
            <div className="relative">
              <FaUserShield className="absolute left-3 top-3 text-[#BCAA99] text-base sm:text-lg" />
              <select
                name="domain"
                value={form.domain}
                onChange={handleChange}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#BCAA99] bg-[#f5f5f7] focus:ring-2 focus:ring-[#BCAA99] outline-none transition font-semibold text-sm sm:text-base"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 mt-2 rounded-lg bg-[#BCAA99] text-[#232526] font-bold text-base sm:text-lg shadow-lg hover:bg-[#e0ddcf] hover:scale-105 transition-transform duration-200 tracking-wide"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-[#232526]" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing up...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
          <p className="mt-6 text-center text-[#534B52] font-medium text-sm sm:text-base">
            Already have an account?{' '}
            <span
              className="underline cursor-pointer hover:text-[#BCAA99] transition"
              onClick={() => navigate('/login')}
            >
              Login
            </span>
          </p>
        </div>
      </div>
      {/* Animations */}
      <style>
        {`
          .animate-float {
            animation: float 4s ease-in-out infinite alternate;
          }
          .animate-float-rev {
            animation: float-rev 5s ease-in-out infinite alternate;
          }
          .animate-float-slow {
            animation: float 7s ease-in-out infinite alternate;
          }
          @keyframes float {
            from { transform: translateY(0px);}
            to { transform: translateY(-30px);}
          }
          @keyframes float-rev {
            from { transform: translateY(0px);}
            to { transform: translateY(30px);}
          }
          .animate-fade-in {
            animation: fadeIn 1.2s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
};

export default Signup;