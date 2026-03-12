import React, { useState } from 'react';

const AddProduct = ({ onClose }) => {

  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    currency: 'USD',
    available: '',
    unit: 'units',
    description: ''
  });

  const handleSubmit = async (e) => {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem("user"));

      const payload = {
        productName: formData.name,
        currency: formData.currency,
        unitPrice: parseFloat(formData.price),
        exporter_name: user.userName,    // matches ProductDTO
        company: user.companyName        // matches ProductDTO
      };

      try {
        const res = await fetch("http://localhost:9090/api/exporter/product/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        alert(data.message);
        onClose();
      } catch (err) {
        console.error(err);
        alert("Failed to add product");
      }
    };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-lg bg-white">

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Add New Product</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>

              <input
                type="text"
                required
                value={formData.name}
                onChange={(e)=>setFormData({...formData,name:e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>

              <div className="flex space-x-2">

                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e)=>setFormData({...formData,price:e.target.value})}
                  className="flex-1 px-4 py-2 border rounded-lg"
                />

                <select
                  value={formData.currency}
                  onChange={(e)=>setFormData({...formData,currency:e.target.value})}
                  className="w-24 px-4 py-2 border rounded-lg"
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>INR</option>
                </select>

              </div>
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
              Add Product
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;