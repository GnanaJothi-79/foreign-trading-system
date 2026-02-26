import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('importer');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo login logic
    if (email === 'rajesh@importco.in' && password === 'password') {
      navigate('/importer/dashboard');
    } else if (email === 'john@exportltd.com' && password === 'password') {
      navigate('/exporter/dashboard');
    } else if (email === 'admin@globalbank.com' && password === 'password') {
      navigate('/bank/dashboard');
    } else {
      alert('Invalid credentials. Try demo accounts.');
    }
  };

  const fillDemoAccount = (type) => {
    if (type === 'importer') {
      setEmail('rajesh@importco.in');
      setPassword('password');
      setSelectedRole('importer');
    } else if (type === 'exporter') {
      setEmail('john@exportltd.com');
      setPassword('password');
      setSelectedRole('exporter');
    } else if (type === 'bank') {
      setEmail('admin@globalbank.com');
      setPassword('password');
      setSelectedRole('bank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      {/* Main Container */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-screen">
          
          {/* Left Column - Welcome Text */}
          <div className="text-white space-y-6">
            <p className="text-blue-200 text-lg">Welcome back</p>
            <h1 className="text-6xl font-bold mb-4">TradeFlow</h1>
            
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 transform hover:scale-[1.02]"
              >
                Sign In
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
              <button className="text-blue-600 font-semibold hover:underline">
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;