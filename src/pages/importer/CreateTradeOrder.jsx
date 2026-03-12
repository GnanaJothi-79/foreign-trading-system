import React, { useState } from 'react';

const CreateTradeOrder = ({ product, onClose, onSuccess }) => {

  const [quantity, setQuantity] = useState(1);
  const [bankSwift, setBankSwift] = useState('');

  const API = "http://localhost:9090/api";

  const user = JSON.parse(localStorage.getItem("user"));
  const importerId = user?.userId;

  const totalAmount = quantity * product.unitPrice;

  const handleSubmit = async (e) => {

    e.preventDefault();

    const orderData = {
      productId: product.productId,
      importerId: importerId,
      quantity: quantity
    };

    try {

      const res = await fetch(`${API}/create/trade`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(orderData)

      });

      const data = await res.json();

      alert(data.message);

      onSuccess();

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">

      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">

        <div className="flex justify-between items-center mb-4">

          <h3 className="text-2xl font-bold text-gray-800">
            Create Trade Order
          </h3>

          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>

        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />

          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bank SWIFT
            </label>

            <input
              type="text"
              value={bankSwift}
              onChange={(e) => setBankSwift(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

          </div>

          <div className="p-4 bg-gray-50 rounded-lg">

            <div className="flex justify-between">

              <span className="font-semibold">
                Total Amount
              </span>

              <span className="text-2xl font-bold text-blue-600">
                ${totalAmount}
              </span>

            </div>

          </div>

          <div className="flex justify-end space-x-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg"
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