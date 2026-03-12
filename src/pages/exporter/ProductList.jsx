import React, { useState, useEffect } from 'react';
import AddProduct from './AddProduct';

const ProductList = () => {

  const [products,setProducts] = useState([]);
  const [showAddProduct,setShowAddProduct] = useState(false);

  useEffect(()=>{
      fetchProducts();
  },[])

  const fetchProducts = async () => {

    try{

      const res = await fetch("http://localhost:9090/api/exporter/product/get");
      const data = await res.json();

      const mapped = data.map(p => ({
        id: p.productId,
        name: p.productName,
        price: p.unitPrice,
        currency: p.currency,
        exporter: p.userName,
        company: p.companyName
      }));

      setProducts(mapped);

    }catch(err){
      console.error(err);
    }
  }

  return (

    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">My Products</h3>

        <button
          onClick={()=>setShowAddProduct(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {products.map(product => (

          <div key={product.id} className="bg-white rounded-lg shadow-sm p-6">

            <h4 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h4>

            <p className="text-sm text-gray-600">
              Price: {product.currency} {product.price}
            </p>

            <p className="text-sm text-gray-600">
              Exporter: {product.exporter}
            </p>

            <span className="text-xs text-gray-500">
              ID: {product.id}
            </span>

          </div>

        ))}

      </div>

      {showAddProduct && (
        <AddProduct onClose={()=>setShowAddProduct(false)} />
      )}

    </div>
  );
};

export default ProductList;