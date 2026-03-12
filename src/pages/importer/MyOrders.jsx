import React, { useEffect, useState } from 'react';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const API = "http://localhost:9090/api";

  const user = JSON.parse(localStorage.getItem("user"));
  const importerId = user?.userId;

  useEffect(() => {
    if (!importerId) return;

    fetch(`${API}/get/trade?user_id=${importerId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched orders:", data);
        setOrders(Array.isArray(data) ? data : [data]); // ensure it's always an array
      })
      .catch(err => console.error(err));
  }, [importerId]);

  return (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">No orders yet.</p>
        </div>
      ) : (
        orders.map(order => (
          <div key={order.tradeId} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {order.productName}
                </h3>
                <p className="text-sm text-gray-500">Order ID: {order.tradeId}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-500">Exporter</p>
                <p className="font-medium">{order.exporterName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Quantity</p>
                <p className="font-medium">{order.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="font-medium">${order.totalAmount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Bank</p>
                <p className="font-medium">{order.bankName}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;