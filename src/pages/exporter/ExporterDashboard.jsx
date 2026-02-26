import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExporterDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-600">TradeFlow</h1>
              <span className="text-gray-400">FOREIGN TRADING SYSTEM</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">John Smith</span>
              <span className="text-gray-500">Export Ltd USA</span>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
                $200,000
              </div>
              <button
                onClick={() => navigate('/')}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Exporter Dashboard</h2>
          <p className="text-gray-600">Review trades and manage shipments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Trades</h3>
            <p className="text-3xl font-bold text-gray-800">3</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Pending Review</h3>
            <p className="text-3xl font-bold text-yellow-500">1</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">To Ship</h3>
            <p className="text-3xl font-bold text-blue-500">0</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Completed</h3>
            <p className="text-3xl font-bold text-green-500">1</p>
          </div>
        </div>

        {/* Pending Review Section */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Pending Review</h3>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Industrial Machinery Parts</h4>
                <p className="text-sm text-gray-600 mb-3">From: ImportCo India • 200 units x EUR 450</p>
                <div className="flex space-x-3">
                  <button className="border border-red-500 text-red-500 px-6 py-2 rounded-lg font-medium hover:bg-red-50">
                    Reject
                  </button>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700">
                    Accept
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-800">EUR 90,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* All Trades Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">All Trades</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {/* Electronic Components */}
            <div className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Electronic Components</h4>
                  <p className="text-sm text-yellow-600 font-medium mb-1">Payment Initiated</p>
                  <p className="text-sm text-gray-500">ImportCo India • USD 62,500</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Raw Cotton Bales */}
            <div className="p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Raw Cotton Bales</h4>
                  <p className="text-sm text-green-600 font-medium mb-1">Paid</p>
                  <p className="text-sm text-gray-500">ImportCo India • USD 85,000</p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">
                  Ship
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExporterDashboard;