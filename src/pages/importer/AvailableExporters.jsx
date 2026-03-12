import React, { useEffect, useState } from 'react';
import CreateTradeOrder from './CreateTradeOrder';

const AvailableExporters = () => {

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const API = "http://localhost:9090/api";

  useEffect(() => {
    fetch(`${API}/exporter/product/get`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        console.log(data);
        
      })
      .catch(err => console.error(err));
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.exporterName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setShowOrderForm(true);
  };

  return (
    <div className="space-y-6">

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="col-span-2">
            <input
              type="text"
              placeholder="Search products or exporters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredProducts.map((product) => (

          <div key={product.productId} className="bg-white rounded-lg shadow-sm hover:shadow-md transition">

            <div className="p-6">

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.productName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Exporter:</span> {product.exporterName}
                </p>

                <p className="text-sm text-gray-600">
                  <span className="font-medium">Country:</span> {product.exporterCountry}
                </p>

              </div>

              <div className="flex justify-between items-center">

                <div>
                  <p className="text-2xl font-bold text-blue-600">
                    ${product.unitPrice}
                  </p>
                </div>

                <button
                  onClick={() => handleBuyNow(product)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Buy Now
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Create Order Modal */}

      {showOrderForm && selectedProduct && (

        <CreateTradeOrder
          product={selectedProduct}
          onClose={() => {
            setShowOrderForm(false);
            setSelectedProduct(null);
          }}
          onSuccess={() => {
            setShowOrderForm(false);
            setSelectedProduct(null);
          }}
        />

      )}

    </div>
  );
};

export default AvailableExporters;