import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ImporterDashboard = () => {
  const navigate = useNavigate();
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);
  const [newOrder, setNewOrder] = useState({
    productName: '',
    quantity: '',
    unitPrice: '',
    currency: 'USD',
    exporter: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({
      ...newOrder,
      [name]: value
    });
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log('New Order:', newOrder);
    // Reset form and close it
    setNewOrder({
      productName: '',
      quantity: '',
      unitPrice: '',
      currency: 'USD',
      exporter: ''
    });
    setShowNewOrderForm(false);
    // Show success message or update orders list
    alert('Trade order created successfully!');
  };

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
              <span className="text-gray-700">Rajes</span>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
                $500,000
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
        {/* Header with New Trade Order Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Importer Dashboard</h2>
            <p className="text-gray-600">Create and manage your trade orders</p>
          </div>
          <button
            onClick={() => setShowNewOrderForm(!showNewOrderForm)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>New Trade Order</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Stats Card - Total Trades */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 col-span-1">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Trades</h3>
            <p className="text-3xl font-bold text-gray-800">3</p>
          </div>
          {/* Empty columns for spacing - adjust based on your layout needs */}
          <div className="col-span-3"></div>
        </div>

        {/* New Trade Order Form - Conditionally Rendered */}
        {showNewOrderForm && (
          <div className="bg-white rounded-lg shadow-sm mb-8 border-2 border-blue-200">
            <div className="px-6 py-4 bg-blue-50 border-b border-blue-200">
              <h3 className="text-xl font-semibold text-blue-800">Create Trade Order</h3>
            </div>
            
            <form onSubmit={handleCreateOrder} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={newOrder.productName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={newOrder.quantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    placeholder="Enter quantity"
                    required
                    min="1"
                  />
                </div>

                {/* Unit Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit Price
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      name="unitPrice"
                      value={newOrder.unitPrice}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Enter price"
                      required
                      min="0"
                      step="0.01"
                    />
                    <select
                      name="currency"
                      value={newOrder.currency}
                      onChange={handleInputChange}
                      className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="INR">INR</option>
                    </select>
                  </div>
                </div>

                {/* Select Exporter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Exporter
                  </label>
                  <select
                    name="exporter"
                    value={newOrder.exporter}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                    required
                  >
                    <option value="">Select an exporter</option>
                    <option value="Export Ltd USA">Export Ltd USA</option>
                    <option value="Global Exports UK">Global Exports UK</option>
                    <option value="Euro Trading Co">Euro Trading Co</option>
                    <option value="Asia Export Group">Asia Export Group</option>
                  </select>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowNewOrderForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Your Trade Orders Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">Your Trade Orders</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {/* Order 1 - Electronic Components */}
            <div className="p-6 hover:bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Electronic Components</h4>
              <p className="text-gray-600 mb-1">5000 units × USD 12.5 = USD 62,500</p>
              <p className="text-sm text-gray-500">Exporter: Export Ltd USA</p>
            </div>

            {/* Order 2 - Industrial Machinery Parts */}
            <div className="p-6 hover:bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Industrial Machinery Parts</h4>
              <p className="text-gray-600 mb-1">200 units × EUR 450 = EUR 90,000</p>
              <p className="text-sm text-gray-500">Exporter: Export Ltd USA</p>
            </div>

            {/* Order 3 - Raw Cotton Bales */}
            <div className="p-6 hover:bg-gray-50">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Raw Cotton Bales</h4>
              <p className="text-gray-600">1000 units × USD 85 = USD 85,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImporterDashboard;