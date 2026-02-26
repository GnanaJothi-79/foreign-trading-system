import React, { useState } from 'react';
import { useTrades } from '../../context/TradeContext';
import ForexConversion from './ForexConversion';

const PendingVerifications = () => {
  const { tradeOrders, verifyPayment, getPendingVerifications } = useTrades();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showForex, setShowForex] = useState(false);

  const pendingOrders = getPendingVerifications();

  const handleVerify = (order) => {
    setSelectedOrder(order);
    setShowForex(true);
  };

  const handleConfirmVerification = (convertedAmount) => {
    if (selectedOrder) {
      verifyPayment(selectedOrder.id);
      setShowForex(false);
      setSelectedOrder(null);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Pending Verifications</h3>
      
      {pendingOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">No pending verifications</p>
        </div>
      ) : (
        pendingOrders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">{order.productName}</h4>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    Awaiting Verification
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Importer</p>
                    <p className="font-medium">{order.importer.companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Exporter</p>
                    <p className="font-medium">{order.exporter.companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-medium">{order.currency} {order.totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-medium">{order.orderDate}</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleVerify(order)}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  >
                    Verify & Process Forex
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Forex Conversion Modal */}
      {showForex && selectedOrder && (
        <ForexConversion
          order={selectedOrder}
          onClose={() => {
            setShowForex(false);
            setSelectedOrder(null);
          }}
          onConfirm={handleConfirmVerification}
        />
      )}
    </div>
  );
};

export default PendingVerifications;