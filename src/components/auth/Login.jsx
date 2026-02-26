import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'importer'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Demo login logic
      if (formData.email === 'rajesh@importco.in' && formData.password === 'password') {
        navigate('/importer/dashboard');
      } else if (formData.email === 'john@exportltd.com' && formData.password === 'password') {
        navigate('/exporter/dashboard');
      } else if (formData.email === 'admin@globalbank.com' && formData.password === 'password') {
        navigate('/bank/dashboard');
      } else {
        setError('Invalid email or password. Try demo accounts below.');
      }
    }, 1500);
  };

  const fillDemoAccount = (type) => {
    if (type === 'importer') {
      setFormData({
        email: 'rajesh@importco.in',
        password: 'password',
        role: 'importer'
      });
    } else if (type === 'exporter') {
      setFormData({
        email: 'john@exportltd.com',
        password: 'password',
        role: 'exporter'
      });
    } else if (type === 'bank') {
      setFormData({
        email: 'admin@globalbank.com',
        password: 'password',
        role: 'bank'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-screen">
          
          {/* Left Column - Welcome Text */}
          <div className="text-white space-y-6">
            <p className="text-blue-200 text-lg">Welcome back</p>
            <Link to="/">
              <h1 className="text-6xl font-bold mb-4 cursor-pointer hover:text-blue-200 transition">TradeFlow</h1>
            </Link>
            
            <div className="space-y-2">
              <p className="text-xl text-blue-100">FOREIGN TRADING SYSTEM</p>
              <p className="text-2xl font-semibold">Secure International</p>
              <p className="text-2xl font-semibold">Trade Management</p>
            </div>
            
            <p className="text-blue-200 text-lg max-w-md">
              Manage trade orders, bank-mediated payments, real-time forex conversion, 
              and shipment tracking — all in one platform.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">12K+</div>
                <div className="text-sm text-blue-200">Trades Processed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">85+</div>
                <div className="text-sm text-blue-200">Countries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-3xl font-bold">150+</div>
                <div className="text-sm text-blue-200">Exchange Pairs</div>
              </div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Sign in to your account</h2>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Login as
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="importer">Importer</option>
                  <option value="exporter">Exporter</option>
                  <option value="bank">Bank</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Demo Accounts Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-4">Demo accounts:</p>
              <div className="space-y-3">
                <button
                  onClick={() => fillDemoAccount('importer')}
                  className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <span className="text-blue-600 font-medium">rajesh@importco.in</span>
                  <span className="text-gray-500 text-sm ml-2">(Importer)</span>
                </button>
                
                <button
                  onClick={() => fillDemoAccount('exporter')}
                  className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <span className="text-blue-600 font-medium">john@exportltd.com</span>
                  <span className="text-gray-500 text-sm ml-2">(Exporter)</span>
                </button>
                
                <button
                  onClick={() => fillDemoAccount('bank')}
                  className="w-full text-left px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <span className="text-blue-600 font-medium">admin@globalbank.com</span>
                  <span className="text-gray-500 text-sm ml-2">(Bank)</span>
                </button>
              </div>
            </div>

            {/* Register Link */}
            <p className="text-center mt-6 text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;