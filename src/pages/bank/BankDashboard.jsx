import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrades } from '../../context/TradeContext';
import { generateLetterOfCredit } from '../../services/documentService';

const BankDashboard = () => {
  const navigate = useNavigate();
  const { 
    trades, 
    verifyAndConvertFunds, 
    transferFunds, 
    convertCurrency,
    exchangeRates 
  } = useTrades();
  
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [showConversion, setShowConversion] = useState(false);

  const pendingVerification = trades.filter(t => t.status === 'payment_initiated');
  const verified = trades.filter(t => t.status === 'verified');
  const completed = trades.filter(t => t.status === 'completed');

  const handleVerify = (trade) => {
    setSelectedTrade(trade);
    setShowConversion(true);
  };

  const handleConfirmVerification = (trade, convertedAmount) => {
    verifyAndConvertFunds(trade.id, convertedAmount);
    setShowConversion(false);
    setSelectedTrade(null);
  };

  const handleTransfer = (tradeId) => {
    transferFunds(tradeId);
  };

  const handleGenerateLC = (trade) => {
    const doc = generateLetterOfCredit(trade, { bank: 'Global Trade Bank' });
    doc.save(`LC_${trade.id}.pdf`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      payment_initiated: { color: 'bg-yellow-100 text-yellow-800', text: 'Awaiting Verification' },
      verified: { color: 'bg-blue-100 text-blue-800', text: 'Verified' },
      completed: { color: 'bg-green-100 text-green-800', text: 'Completed' }
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', text: status };
    
    return (
      <span className={`${config.color} px-3 py-1 rounded-full text-sm font-medium`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-600">TradeFlow</h1>
              <span className="text-gray-400">FOREIGN TRADING SYSTEM</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Bank Admin</span>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Bank Dashboard</h2>
          <p className="text-gray-600">Verify, convert, and transfer funds</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Awaiting Verification</h3>
            <p className="text-3xl font-bold text-yellow-500">{pendingVerification.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Awaiting Forex</h3>
            <p className="text-3xl font-bold text-blue-500">0</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Ready to Transfer</h3>
            <p className="text-3xl font-bold text-purple-500">{verified.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Completed</h3>
            <p className="text-3xl font-bold text-green-500">{completed.length}</p>
          </div>
        </div>

        {/* Exchange Rates */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-3">Current Exchange Rates</h3>
          <div className="grid grid-cols-5 gap-4">
            {Object.entries(exchangeRates).map(([currency, rate]) => (
              <div key={currency} className="text-center">
                <span className="text-sm text-gray-500">1 USD =</span>
                <span className="block font-semibold">
                  {currency} {(1/rate).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1 - Verify Funds */}
        {pendingVerification.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Step 1 — Verify Funds</h3>
            </div>
            
            {pendingVerification.map(trade => (
              <div key={trade.id} className="p-6 border-b last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{trade.productName}</h4>
                    <p className="text-sm text-gray-600 mb-1">Payment Initiated</p>
                    <p className="text-sm text-gray-500">
                      {trade.importer} → {trade.exporter} • {trade.currency} {trade.totalAmount.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleVerify(trade)}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700"
                  >
                    Verify
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Step 2 - Ready to Transfer */}
        {verified.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Step 2 — Ready to Transfer</h3>
            </div>
            
            {verified.map(trade => (
              <div key={trade.id} className="p-6 border-b last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{trade.productName}</h4>
                    <p className="text-sm text-green-600 font-medium mb-1">Funds Verified</p>
                    <p className="text-sm text-gray-500 mb-1">
                      {trade.importer} → {trade.exporter}
                    </p>
                    {trade.convertedAmount && (
                      <p className="text-sm text-blue-600 font-medium">
                        Converted: {trade.convertedAmount}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleGenerateLC(trade)}
                      className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50"
                    >
                      Generate LC
                    </button>
                    <button
                      onClick={() => handleTransfer(trade.id)}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Transfer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Processed Transactions */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Processed Transactions</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {completed.map(trade => (
              <div key={trade.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{trade.productName}</h4>
                    <p className="text-sm text-green-600 font-medium mb-1">Paid</p>
                    <p className="text-sm text-gray-500">
                      {trade.importer} → {trade.exporter} • {trade.currency} {trade.totalAmount.toLocaleString()}
                    </p>
                    {trade.convertedAmount && (
                      <p className="text-sm text-gray-500 mt-1">
                        Final Settlement: {trade.convertedAmount}
                      </p>
                    )}
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Currency Conversion Modal */}
      {showConversion && selectedTrade && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-lg bg-white">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Currency Conversion</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Original Amount:</p>
                <p className="text-lg font-semibold">
                  {selectedTrade.currency} {selectedTrade.totalAmount.toLocaleString()}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Convert to:</p>
                <select className="w-full px-4 py-2 border rounded-lg">
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="INR">INR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Converted Amount:</p>
                <p className="text-2xl font-bold text-blue-600">
                  USD {convertCurrency(selectedTrade.totalAmount, selectedTrade.currency, 'USD').toFixed(2)}
                </p>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowConversion(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleConfirmVerification(
                    selectedTrade, 
                    `USD ${convertCurrency(selectedTrade.totalAmount, selectedTrade.currency, 'USD').toFixed(2)}`
                  )}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Confirm Verification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankDashboard;