import React, { useState } from 'react';
import { useTrades } from '../../context/TradeContext';

const ForexConversion = ({ order, onClose, onConfirm }) => {
  const { exchangeRates, processForex, completeTransfer } = useTrades();
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [step, setStep] = useState('verify'); // verify, convert, transfer

  const convertAmount = (amount, from, to) => {
    const usdAmount = amount / exchangeRates[from];
    return usdAmount * exchangeRates[to];
  };

  const convertedAmount = convertAmount(order.totalAmount, order.currency, targetCurrency);

  const handleVerify = () => {
    setStep('convert');
  };

  const handleConvert = () => {
    processForex(order.id, `${targetCurrency} ${convertedAmount.toFixed(2)}`);
    setStep('transfer');
  };

  const handleTransfer = () => {
    completeTransfer(order.id);
    onConfirm(`${targetCurrency} ${convertedAmount.toFixed(2)}`);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Bank Processing</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex-1 text-center ${step === 'verify' ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                step === 'verify' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <span>Verify Funds</span>
            </div>
            <div className={`flex-1 text-center ${step === 'convert' ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                step === 'convert' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <span>Forex Conversion</span>
            </div>
            <div className={`flex-1 text-center ${step === 'transfer' ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-2 ${
                step === 'transfer' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
              <span>Transfer Funds</span>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-gray-700 mb-2">Order Details</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Product: {order.productName}</p>
              <p className="text-sm text-gray-600">Importer: {order.importer.companyName}</p>
              <p className="text-sm text-gray-600">Exporter: {order.exporter.companyName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Amount: {order.currency} {order.totalAmount.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Order ID: {order.id}</p>
              <p className="text-sm text-gray-600">Date: {order.orderDate}</p>
            </div>
          </div>
        </div>

        {/* Step Content */}
        {step === 'verify' && (
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-lg">
              <p className="text-yellow-800">
                Verify that the importer has sufficient funds in their account.
              </p>
            </div>
            <button
              onClick={handleVerify}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Confirm Funds Available
            </button>
          </div>
        )}

        {step === 'convert' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Convert to Currency
              </label>
              <select
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="JPY">JPY - Japanese Yen</option>
              </select>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Exchange Rate:</p>
              <p className="text-lg font-semibold">
                1 {order.currency} = {(1 / exchangeRates[order.currency] * exchangeRates[targetCurrency]).toFixed(4)} {targetCurrency}
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Converted Amount:</p>
              <p className="text-2xl font-bold text-green-600">
                {targetCurrency} {convertedAmount.toFixed(2)}
              </p>
            </div>

            <button
              onClick={handleConvert}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Confirm Conversion
            </button>
          </div>
        )}

        {step === 'transfer' && (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-green-800 mb-2">Ready to transfer to exporter:</p>
              <p className="font-semibold">{order.exporter.companyName}</p>
              <p className="text-sm text-gray-600 mt-2">Amount: {targetCurrency} {convertedAmount.toFixed(2)}</p>
            </div>

            <button
              onClick={handleTransfer}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              Complete Transfer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForexConversion;