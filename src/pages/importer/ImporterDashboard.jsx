import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrades } from '../../context/TradeContext';
import CreateTradeOrder from './CreateTradeOrder';
import { generateInvoice, generateBillOfLading } from '../../services/documentService';

const ImporterDashboard = () => {
  const navigate = useNavigate();
  const { trades, initiatePayment, getTradesByStatus } = useTrades();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);

  const importerTrades = trades.filter(t => t.importer === 'ImportCo India');
  
  const pendingTrades = importerTrades.filter(t => t.status === 'pending_review');
  const activeTrades = importerTrades.filter(t => 
    ['accepted', 'payment_initiated', 'verified'].includes(t.status)
  );
  const completedTrades = importerTrades.filter(t => t.status === 'completed');

  const handleDownloadDocument = (trade, documentType) => {
    let doc;
    if (documentType === 'invoice') {
      doc = generateInvoice(trade);
    } else if (documentType === 'bill') {
      doc = generateBillOfLading(trade);
    }
    
    if (doc) {
      doc.save(`${documentType}_${trade.id}.pdf`);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending_review: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending Review' },
      accepted: { color: 'bg-green-100 text-green-800', text: 'Accepted' },
      payment_initiated: { color: 'bg-blue-100 text-blue-800', text: 'Payment Initiated' },
      verified: { color: 'bg-purple-100 text-purple-800', text: 'Funds Verified' },
      completed: { color: 'bg-gray-100 text-gray-800', text: 'Completed' }
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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Importer Dashboard</h2>
            <p className="text-gray-600">Create and manage your trade orders</p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>New Trade Order</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Trades</h3>
            <p className="text-3xl font-bold text-gray-800">{importerTrades.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Pending</h3>
            <p className="text-3xl font-bold text-yellow-500">{pendingTrades.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Active</h3>
            <p className="text-3xl font-bold text-blue-500">{activeTrades.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Completed</h3>
            <p className="text-3xl font-bold text-green-500">{completedTrades.length}</p>
          </div>
        </div>

        {/* Trade Orders */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">Your Trade Orders</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {importerTrades.map(trade => (
              <div key={trade.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{trade.productName}</h4>
                    <p className="text-sm text-gray-500 mt-1">Order ID: {trade.id}</p>
                  </div>
                  {getStatusBadge(trade.status)}
                </div>
                
                <p className="text-gray-600 mb-2">
                  {trade.quantity.toLocaleString()} units × {trade.currency} {trade.unitPrice.toFixed(2)} = {trade.currency} {trade.totalAmount.toLocaleString()}
                </p>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Exporter: {trade.exporter}</p>
                  
                  <div className="flex space-x-3">
                    {/* Action buttons based on status */}
                    {trade.status === 'accepted' && (
                      <button
                        onClick={() => initiatePayment(trade.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
                      >
                        Pay Now
                      </button>
                    )}
                    
                    {trade.status === 'completed' && (
                      <>
                        <button
                          onClick={() => handleDownloadDocument(trade, 'invoice')}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Download Invoice
                        </button>
                        <button
                          onClick={() => handleDownloadDocument(trade, 'bill')}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Download B/L
                        </button>
                      </>
                    )}
                    
                    {trade.documents && trade.documents.length > 0 && (
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                
                {trade.convertedAmount && (
                  <p className="text-sm text-green-600 font-medium mt-2">
                    Converted: {trade.convertedAmount}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Trade Order Modal */}
      {showCreateForm && (
        <CreateTradeOrder
          onClose={() => setShowCreateForm(false)}
          onSuccess={(newTrade) => {
            setShowCreateForm(false);
            alert(`Trade order created successfully! Order ID: ${newTrade.id}`);
          }}
        />
      )}
    </div>
  );
};

export default ImporterDashboard;