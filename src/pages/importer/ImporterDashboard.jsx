import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AvailableExporters from "./AvailableExporters";
import MyOrders from "./MyOrders";

const ImporterDashboard = () => {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("products");
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const importerId = user?.userId;

  useEffect(() => {
    if (importerId) {
      fetchOrders();
    }
  }, [importerId]);

  // Fetch orders
  const fetchOrders = async () => {
    try {

      const response = await fetch(
        `http://localhost:9090/api/get/trade?user_id=${importerId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data);

      console.log(data);
      

    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Filter orders
  const pendingOrders = orders.filter((o) => o.status === "PENDING");
  const activeOrders = orders.filter((o) =>
    ["ACCEPTED", "VERIFIED", "SHIPPED"].includes(o.status)
  );
  const completedOrders = orders.filter((o) => o.status === "DELIVERED");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">

            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-blue-600">
                TradeFlow
              </h1>
              <span className="text-gray-400">
                IMPORTER PORTAL
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Importer
              </span>

              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
      </nav>


      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-8">

        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Importer Dashboard
          </h2>

          <p className="text-gray-600">
            Browse exporters and manage your trade orders
          </p>
        </div>


        {/* STATISTICS */}
        <div className="grid grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm text-gray-500 mb-2">
              Total Orders
            </h3>
            <p className="text-3xl font-bold">
              {orders.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm text-gray-500 mb-2">
              Pending
            </h3>
            <p className="text-3xl font-bold text-yellow-500">
              {pendingOrders.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm text-gray-500 mb-2">
              Active
            </h3>
            <p className="text-3xl font-bold text-blue-500">
              {activeOrders.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm text-gray-500 mb-2">
              Completed
            </h3>
            <p className="text-3xl font-bold text-green-500">
              {completedOrders.length}
            </p>
          </div>

        </div>


        {/* TABS */}
        <div className="mb-6 border-b">

          <nav className="flex space-x-8">

            <button
              onClick={() => setActiveTab("products")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "products"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500"
              }`}
            >
              Available Products
            </button>


            <button
              onClick={() => setActiveTab("orders")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "orders"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500"
              }`}
            >
              My Orders
            </button>

          </nav>

        </div>


        {/* TAB CONTENT */}

        {activeTab === "products" ? (
          <AvailableExporters importerId={importerId} />
        ) : (
          <MyOrders orders={orders} />
        )}

      </div>
    </div>
  );
};

export default ImporterDashboard;