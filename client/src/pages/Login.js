import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '', domain: 'user' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Login successful!');
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('domain', data.domain);
        setTimeout(() => {
          if (data.domain === 'admin') {
            navigate('/admin/dashboard');
          } else {
            navigate('/user/dashboard');
          }
        }, 1200);
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch {
      toast.error('Network error');
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center transition-all duration-1000 px-2"
      style={{
        background: "linear-gradient(135deg, #f5f5f7 0%, #e0ddcf 100%)"
      }}
    >
      <Toaster />
      <div className="bg-white/90 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-10 w-full max-w-md animate-fade-in border border-[#BCAA99]">
        <h2 className="text-xl sm:text-3xl font-extrabold text-[#534B52] mb-4 sm:mb-6 text-center tracking-tight drop-shadow">Welcome Back!</h2>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-[#534B52] font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-[#BCAA99] bg-[#f5f5f7] text-[#232526] focus:ring-2 focus:ring-[#BCAA99] outline-none transition"
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-[#534B52] font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-[#BCAA99] bg-[#f5f5f7] text-[#232526] focus:ring-2 focus:ring-[#BCAA99] outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-[#534B52] font-semibold mb-1">Domain</label>
            <select
              name="domain"
              value={form.domain}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-[#BCAA99] bg-[#f5f5f7] text-[#232526] focus:ring-2 focus:ring-[#BCAA99] outline-none transition"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 rounded-lg bg-[#BCAA99] text-[#232526] font-bold text-base sm:text-lg shadow-lg hover:bg-[#e0ddcf] transition-transform duration-200"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-6 text-center text-[#534B52] text-sm sm:text-base">
          Don't have an account?{' '}
          <span
            className="underline cursor-pointer hover:text-[#BCAA99] transition"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </span>
        </p>
      </div>
      <style>
        {`
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

export default Login;