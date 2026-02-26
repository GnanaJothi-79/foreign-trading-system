import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-screen">
          
          {/* Left Column - Welcome Text */}
          <div className="text-white space-y-6">
            <p className="text-blue-200 text-lg">Welcome to</p>
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

            {/* CTA Buttons */}
            <div className="flex space-x-4 pt-4">
              <Link
                to="/login"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
              >
                Register
              </Link>
            </div>

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

          {/* Right Column - Info Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Why Choose TradeFlow?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Secure bank-mediated payments</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Real-time currency conversion</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>End-to-end shipment tracking</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Automated document generation</span>
              </li>
            </ul>
            
            <div className="mt-8 p-4 bg-white/20 rounded-lg">
              <p className="text-sm">
                Join 12,000+ businesses already trading on our platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;