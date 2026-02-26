import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrades } from '../../context/TradeContext';
import { generateInvoice } from '../../services/documentService';

const ExporterDashboard = () => {
  const navigate = useNavigate();
  const { trades, updateTradeStatus, getTradesByStatus } = useTrades();
  const [selectedTrade, setSelectedTrade] = useState(null);

  const exporterTrades = trades.filter(t => t.exporter === 'Export Ltd USA');
  
  const pendingReview = exporterTrades.filter(t => t.status === 'pending_review');
  const accepted = exporterTrades.filter(t => t.status === 'accepted');
  const paymentInitiated = exporterTrades.filter(t => t.status === 'payment_initiated');
  const completed = exporterTrades.filter(t => t.status === 'completed');

  const handleAccept = (tradeId) => {
    updateTradeStatus(tradeId, 'accepted');
  };

  const handleReject = (tradeId) => {
    updateTradeStatus(tradeId, 'rejected');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending_review: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending Review' },
      accepted: { color: 'bg-green-100 text-green-800', text: 'Accepted' },
      payment_initiated: { color: 'bg-blue-100 text-blue-800', text: 'Payment Initiated' },
      verified: { color: 'bg-purple-100 text-purple-800', text: 'Funds Verified' },
      completed: { color: 'bg-gray-100 text-gray-800', text: 'Completed' },
      rejected: { color: 'bg-red-100 text-red-800', text: 'Rejected' }
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

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Trades</h3>
            <p className="text-3xl font-bold text-gray-800">{exporterTrades.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Pending Review</h3>
            <p className="text-3xl font-bold text-yellow-500">{pendingReview.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">To Ship</h3>
            <p className="text-3xl font-bold text-blue-500">{paymentInitiated.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Completed</h3>
            <p className="text-3xl font-bold text-green-500">{completed.length}</p>
          </div>
        </div>

        {/* Pending Review Section */}
        {pendingReview.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Pending Review</h3>
            </div>
            
            {pendingReview.map(trade => (
              <div key={trade.id} className="p-6 border-b last:border-b-0">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{trade.productName}</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      From: {trade.importer} • {trade.quantity} units x {trade.currency} {trade.unitPrice}
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleReject(trade.id)}
                        className="border border-red-500 text-red-500 px-6 py-2 rounded-lg font-medium hover:bg-red-50"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleAccept(trade.id)}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-800">
                      {trade.currency} {trade.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* All Trades */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">All Trades</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {exporterTrades.map(trade => (
              <div key={trade.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{trade.productName}</h4>
                    <div className="mb-2">
                      {getStatusBadge(trade.status)}
                    </div>
                    <p className="text-sm text-gray-500">
                      {trade.importer} • {trade.currency} {trade.totalAmount.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {trade.status === 'payment_initiated' && (
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">
                        Ship
                      </button>
                    )}
                    
                    {trade.status === 'verified' && (
                      <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700">
                        Confirm Shipment
                      </button>
                    )}
                    
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExporterDashboard;