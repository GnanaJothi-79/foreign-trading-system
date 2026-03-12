import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrades } from "../../services/TradeContext";
import PendingVerifications from "./PendingVerifications";
import TransactionHistory from "./TransactionHistory";

const BankDashboard = () => {
  const navigate = useNavigate();
  const { tradeOrders, getPendingTransfers } = useTrades(); // ✅ updated
  const [activeTab, setActiveTab] = useState("pending");

  const pendingVerifications = getPendingTransfers(); // ✅ updated
  const verifiedOrders = tradeOrders.filter((o) => o.status === "VERIFIED");
  const completedOrders = tradeOrders.filter((o) => o.status === "COMPLETED");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-600">TradeFlow</h1>
              <span className="text-gray-400">BANK PORTAL</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Global Trade Bank</span>
              <button
                onClick={() => navigate("/")}
                className="text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Bank Dashboard</h2>
          <p className="text-gray-600">Verify transactions and process payments</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Pending Verification</h3>
            <p className="text-3xl font-bold text-yellow-500">{pendingVerifications.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Verified</h3>
            <p className="text-3xl font-bold text-blue-500">{verifiedOrders.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Completed</h3>
            <p className="text-3xl font-bold text-green-500">{completedOrders.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Processed</h3>
            <p className="text-3xl font-bold text-gray-800">
              ${tradeOrders.reduce((sum, o) => sum + o.totalAmount, 0).toFixed(0)}k
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("pending")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "pending"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Pending Verifications
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "history"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Transaction History
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "pending" ? <PendingVerifications /> : <TransactionHistory />}
      </div>
    </div>
  );
};

export default BankDashboard;