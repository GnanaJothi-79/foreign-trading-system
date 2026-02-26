import React from 'react';
import { useTrades } from '../../context/TradeContext';

const MyOrders = () => {
  const { tradeOrders, initiatePayment } = useTrades();
  
  const importerOrders = tradeOrders.filter(o => o.importer.id === 'IMP001');

  const getStatusBadge = (order) => {
    const statusConfig = {
      pending_review: { color: 'bg-yellow-100 text-yellow-800', text: 'Awaiting Exporter Review' },
      accepted: { color: 'bg-green-100 text-green-800', text: 'Accepted - Ready for Payment' },
      rejected: { color: 'bg-red-100 text-red-800', text: 'Rejected' },
      payment_initiated: { color: 'bg-blue-100 text-blue-800', text: 'Payment Initiated' },
      verified: { color: 'bg-purple-100 text-purple-800', text: 'Bank Verified' },
      forex_completed: { color: 'bg-indigo-100 text-indigo-800', text: 'Forex Completed' },
      completed: { color: 'bg-gray-100 text-gray-800', text: 'Completed' }
    };
    
    const config = statusConfig[order.status] || { color: 'bg-gray-100 text-gray-800', text: order.status };
    
    return (
      <span className={`${config.color} px-3 py-1 rounded-full text-sm font-medium`}>
        {config.text}
      </span>
    );
  };

  const getPaymentStatusBadge = (order) => {
    if (order.paymentStatus === 'completed') {
      return <span className="text-green-600 font-medium">Paid</span>;
    } else if (order.paymentStatus === 'processing') {
      return <span className="text-blue-600 font-medium">Processing</span>;
    }
    return <span className="text-yellow-600 font-medium">Pending</span>;
  };

  return (
    <div className="space-y-4">
      {importerOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">No orders yet. Start by browsing available products!</p>
        </div>
      ) : (
        importerOrders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{order.productName}</h3>
                <p className="text-sm text-gray-500">Order ID: {order.id}</p>
              </div>
              {getStatusBadge(order)}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Exporter</p>
                <p className="font-medium">{order.exporter.companyName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="font-medium">{order.quantity} units</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium">{order.currency} {order.totalAmount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Status</p>
                {getPaymentStatusBadge(order)}
              </div>
            </div>

            {order.convertedAmount && (
              <div className="mb-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  Converted Amount: {order.convertedAmount}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              {order.status === 'accepted' && (
                <button
                  onClick={() => initiatePayment(order.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700"
                >
                  Initiate Payment
                </button>
              )}
              
              {order.documents.length > 0 && (
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Download Documents
                </button>
              )}
              
              <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                View Details
              </button>
            </div>

            {/* Bank Info */}
            {order.bankVerified && (
              <div className="mt-4 text-sm text-gray-500 border-t pt-4">
                <p>Verified by bank: Yes</p>
                {order.forexConverted && <p>Forex conversion: Completed</p>}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;