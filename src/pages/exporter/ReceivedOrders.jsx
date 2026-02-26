import React from 'react';
import { useTrades } from '../../context/TradeContext';

const ReceivedOrders = ({ onUpdateStatus }) => {
  const { tradeOrders, updateOrderStatus } = useTrades();
  
  const exporterId = 'EXP001'; // In real app, this comes from auth
  const exporterOrders = tradeOrders.filter(o => o.exporter.id === exporterId);

  const pendingOrders = exporterOrders.filter(o => o.status === 'pending_review');
  const acceptedOrders = exporterOrders.filter(o => o.status === 'accepted');
  const completedOrders = exporterOrders.filter(o => o.status === 'completed');

  const handleAccept = (orderId) => {
    updateOrderStatus(orderId, 'accepted');
  };

  const handleReject = (orderId) => {
    updateOrderStatus(orderId, 'rejected');
  };

  return (
    <div className="space-y-6">
      {/* Pending Orders Section */}
      {pendingOrders.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 bg-yellow-50 border-b border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800">
              Pending Review ({pendingOrders.length})
            </h3>
          </div>
          
          {pendingOrders.map(order => (
            <div key={order.id} className="p-6 border-b last:border-b-0">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{order.productName}</h4>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-500">Importer</p>
                      <p className="font-medium">{order.importer.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="font-medium">{order.quantity} units</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Unit Price</p>
                      <p className="font-medium">{order.currency} {order.unitPrice}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-medium">{order.currency} {order.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleReject(order.id)}
                      className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleAccept(order.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                      Accept Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Accepted Orders */}
      {acceptedOrders.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 bg-green-50 border-b border-green-200">
            <h3 className="text-lg font-semibold text-green-800">
              Accepted Orders ({acceptedOrders.length})
            </h3>
          </div>
          
          {acceptedOrders.map(order => (
            <div key={order.id} className="p-6 border-b last:border-b-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{order.productName}</h4>
                  <p className="text-sm text-gray-600 mb-2">Importer: {order.importer.companyName}</p>
                  <p className="text-sm text-gray-600">Amount: {order.currency} {order.totalAmount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-2">Awaiting payment initiation</p>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Awaiting Payment
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Orders */}
      {pendingOrders.length === 0 && acceptedOrders.length === 0 && completedOrders.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">No orders received yet.</p>
        </div>
      )}
    </div>
  );
};

export default ReceivedOrders;