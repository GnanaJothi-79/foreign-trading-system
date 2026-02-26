import React, { useState } from 'react';
import { useTrades } from '../../context/TradeContext';

const CreateTradeOrder = ({ product, onClose, onSuccess }) => {
  const { createTradeOrder, validateBank } = useTrades();
  const [quantity, setQuantity] = useState(1);
  const [shippingTerms, setShippingTerms] = useState('FOB');
  const [paymentTerms, setPaymentTerms] = useState('LC');
  const [bankSwift, setBankSwift] = useState('');
  const [bankError, setBankError] = useState('');

  const totalAmount = quantity * product.price;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate bank
    const bank = validateBank(bankSwift);
    if (!bank) {
      setBankError('Invalid SWIFT code. Please check and try again.');
      return;
    }

    const orderData = {
      productId: product.id,
      exporterId: product.exporterId,
      quantity: quantity,
      shippingTerms,
      paymentTerms,
      bankSwift
    };
    
    const newOrder = createTradeOrder(orderData);
    onSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Create Trade Order</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">Product Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Product: {product.name}</p>
              <p className="text-sm text-gray-600">Exporter: {product.exporterName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Price: {product.currency} {product.price} per {product.unit.slice(0, -1)}</p>
              <p className="text-sm text-gray-600">Available: {product.available} {product.unit}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity ({product.unit})
            </label>
            <input
              type="number"
              min="1"
              max={product.available}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Max available: {product.available}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipping Terms
            </label>
            <select
              value={shippingTerms}
              onChange={(e) => setShippingTerms(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="FOB">FOB (Free on Board)</option>
              <option value="CIF">CIF (Cost, Insurance, Freight)</option>
              <option value="EXW">EXW (Ex Works)</option>
              <option value="DDP">DDP (Delivered Duty Paid)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Terms
            </label>
            <select
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="LC">Letter of Credit</option>
              <option value="TT">Telegraphic Transfer</option>
              <option value="DP">Documents against Payment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Bank SWIFT Code
            </label>
            <input
              type="text"
              value={bankSwift}
              onChange={(e) => {
                setBankSwift(e.target.value);
                setBankError('');
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                bankError ? 'border-red-500' : ''
              }`}
              placeholder="e.g., SBININBB"
              required
            />
            {bankError && (
              <p className="mt-1 text-sm text-red-600">{bankError}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Enter your bank's SWIFT code for verification
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Total Amount:</span>
              <span className="text-2xl font-bold text-blue-600">
                {product.currency} {totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
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