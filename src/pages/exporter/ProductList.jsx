import React, { useState } from 'react';
import { useTrades } from '../../context/TradeContext';
import AddProduct from './AddProduct';

const ProductList = () => {
  const { exporters } = useTrades();
  const [showAddProduct, setShowAddProduct] = useState(false);
  
  const exporterId = 'EXP001'; // In real app, this comes from auth
  const exporter = exporters.find(e => e.id === exporterId);

  const products = exporter?.products || [];

  const getStatusColor = (available) => {
    if (available > 1000) return 'text-green-600';
    if (available > 100) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">My Products</h3>
        <button
          onClick={() => setShowAddProduct(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Product</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition">
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {product.category}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Price:</span> {product.currency} {product.price} per {product.unit.slice(0, -1)}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Available:</span>{' '}
                  <span className={getStatusColor(product.available)}>
                    {product.available.toLocaleString()} {product.unit}
                  </span>
                </p>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>

              <div className="flex justify-between items-center pt-3 border-t">
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-800 text-sm">
                    Delete
                  </button>
                </div>
                <span className="text-xs text-gray-500">ID: {product.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <AddProduct onClose={() => setShowAddProduct(false)} />
      )}
    </div>
  );
};

export default ProductList;