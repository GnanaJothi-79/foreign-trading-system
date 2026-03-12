import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import ReceivedOrders from "./ReceivedOrders";

const ExporterDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("orders");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const exporterId = user?.userId ?? null;

  console.log(exporterId);
  

  const API = "http://localhost:9090/api/exporter";

  const loadProducts = async () => {
    try {
      const res = await fetch(`${API}/product/get`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Product loading error:", err);
      setProducts([]);
    }
  };

  const loadOrders = async () => {
    if (!exporterId) return;
    try {
      const res = await fetch(`${API}/trade/get?user_id=${exporterId}`);
      const data = await res.json();
      console.log(data);
      
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Orders loading error:", err);
      setOrders([]);
    }
  };

  useEffect(() => {
    if (exporterId !== null) {
      loadProducts();
      loadOrders();
    }
  }, [exporterId]);

  const acceptOrder = async tradeId => {
    try {
      await fetch(`${API}/accept/${tradeId}`, { method: "PUT" });
      loadOrders();
    } catch (err) {
      console.error("Accept order error:", err);
    }
  };

  const shipOrder = async tradeId => {
    try {
      await fetch(`${API}/ship/${tradeId}`, { method: "PUT" });
      loadOrders();
    } catch (err) {
      console.error("Ship order error:", err);
    }
  };

  const deliverOrder = async tradeId => {
    try {
      await fetch(`${API}/deliver/${tradeId}`, { method: "PUT" });
      loadOrders();
    } catch (err) {
      console.error("Deliver order error:", err);
    }
  };

  // Stats
  const pendingReview = orders.filter(o => o.status === "PENDING");
  const verified = orders.filter(o => o.status === "VERIFIED");
  const shipped = orders.filter(o => o.status === "SHIPPED");
  const delivered = orders.filter(o => o.status === "DELIVERED");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow border-b">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-600">TradeFlow</h1>
              <span className="text-gray-400">EXPORTER PORTAL</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{user?.userName || "Exporter"}</span>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/");
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Exporter Dashboard</h2>
          <p className="text-gray-600">Manage your products and review incoming orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm text-gray-500 mb-2">Pending Review</h3>
            <p className="text-3xl font-bold text-yellow-500">{pendingReview.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm text-gray-500 mb-2">Verified</h3>
            <p className="text-3xl font-bold text-green-500">{verified.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm text-gray-500 mb-2">Shipped</h3>
            <p className="text-3xl font-bold text-blue-500">{shipped.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm text-gray-500 mb-2">Delivered</h3>
            <p className="text-3xl font-bold text-purple-500">{delivered.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "orders"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500"
              }`}
            >
              Received Orders
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "products"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500"
              }`}
            >
              My Products
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === "orders" && (
          <ReceivedOrders
            orders={orders}
            onAccept={acceptOrder}
            onShip={shipOrder}
            onDeliver={deliverOrder}
          />
        )}
        {activeTab === "products" && (
          <ProductList products={products} reloadProducts={loadProducts} />
        )}
      </div>
    </div>
  );
};

export default ExporterDashboard;