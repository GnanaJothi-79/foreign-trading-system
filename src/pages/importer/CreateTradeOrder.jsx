import React, { useState } from 'react';
import { useTrades } from '../../context/TradeContext';

const CreateTradeOrder = ({ onClose, onSuccess }) => {
  const { createTradeOrder } = useTrades();
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    unitPrice: '',
    currency: 'USD',
    exporter: '',
    shippingMethod: 'sea',
    incoterm: 'FOB'
  });

  const exporters = [
    { id: 'EXP001', name: 'Export Ltd USA', country: 'USA' },
    { id: 'EXP002', name: 'Global Exports UK', country: 'UK' },
    { id: 'EXP003', name: 'Euro Trading Co', country: 'Germany' },
    { id: 'EXP004', name: 'Asia Export Group', country: 'China' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const orderData = {
      ...formData,
      quantity: parseInt(formData.quantity),
      unitPrice: parseFloat(formData.unitPrice),
      importer: 'ImportCo India',
      totalAmount: parseInt(formData.quantity) * parseFloat(formData.unitPrice)
    };
    
    const newTrade = createTradeOrder(orderData);
    onSuccess?.(newTrade);
  };

  const totalAmount = formData.quantity && formData.unitPrice 
    ? (parseInt(formData.quantity) * parseFloat(formData.unitPrice)).toFixed(2)
    : '0.00';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Create New Trade Order</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            {/* Product Details */}
            <div className="col-span-2">
              <h4 className="font-semibold text-gray-700 mb-3">Product Details</h4>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.productName}
                onChange={(e) => setFormData({...formData, productName: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Electronic Components"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter quantity"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit Price *
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData({...formData, unitPrice: e.target.value})}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price"
                />
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({...formData, currency: e.target.value})}
                  className="w-24 px-4 py-2 border rounded-lg bg-white"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Exporter *
              </label>
              <select
                required
                value={formData.exporter}
                onChange={(e) => setFormData({...formData, exporter: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg bg-white"
              >
                <option value="">Select exporter</option>
                {exporters.map(ex => (
                  <option key={ex.id} value={ex.name}>{ex.name} - {ex.country}</option>
                ))}
              </select>
            </div>

            {/* Shipping Details */}
            <div className="col-span-2 mt-4">
              <h4 className="font-semibold text-gray-700 mb-3">Shipping Details</h4>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Method
              </label>
              <select
                value={formData.shippingMethod}
                onChange={(e) => setFormData({...formData, shippingMethod: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg bg-white"
              >
                <option value="sea">Sea Freight</option>
                <option value="air">Air Freight</option>
                <option value="land">Land Transport</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Incoterm
              </label>
              <select
                value={formData.incoterm}
                onChange={(e) => setFormData({...formData, incoterm: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg bg-white"
              >
                <option value="FOB">FOB (Free on Board)</option>
                <option value="CIF">CIF (Cost, Insurance, Freight)</option>
                <option value="EXW">EXW (Ex Works)</option>
                <option value="DDP">DDP (Delivered Duty Paid)</option>
              </select>
            </div>

            {/* Total Amount */}
            <div className="col-span-2 mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Total Amount:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formData.currency} {totalAmount}
                </span>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTradeOrder;