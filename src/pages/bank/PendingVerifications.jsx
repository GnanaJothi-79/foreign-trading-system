import React from "react";
import { useTrades } from "../../services/TradeContext";

const PendingVerifications = () => {
  const { getPendingTransfers, transferFunds, loadingTradeId } = useTrades();
  const pendingOrders = getPendingTransfers();

  const handleTransfer = (order) => {
    transferFunds({
      importerAccNo: order.importerAccNo,
      exporterAccNo: order.exporterAccNo,
      tradeId: order.tradeId,
      fund: order.totalAmount,
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Pending Transfers</h3>

      {pendingOrders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">No pending transfers</p>
        </div>
      ) : (
        pendingOrders.map((order) => (
          <div key={order.tradeId} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-800">{order.productName}</h4>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    Awaiting Transfer
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Importer</p>
                    <p className="font-medium">{order.importerName}</p>
                    <p className="text-xs text-gray-400">Acc: {order.importerAccNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Exporter</p>
                    <p className="font-medium">{order.exporterName}</p>
                    <p className="text-xs text-gray-400">Acc: {order.exporterAccNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-medium">{order.totalAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bank</p>
                    <p className="font-medium">{order.bankName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium text-yellow-700">{order.status}</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleTransfer(order)}
                    disabled={loadingTradeId === order.tradeId}
                    className={`px-6 py-2 rounded-lg text-white ${
                      loadingTradeId === order.tradeId ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {loadingTradeId === order.tradeId ? "Processing..." : "Transfer Funds"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PendingVerifications;