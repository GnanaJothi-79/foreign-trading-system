import { createContext, useContext, useState, useEffect } from "react";

const TradeContext = createContext();

export const TradeProvider = ({ children }) => {
  const [tradeOrders, setTradeOrders] = useState([]);
  const [loadingTradeId, setLoadingTradeId] = useState(null); // track which transfer is processing

  // Fetch ACCEPTED trades for the current bank user
  const fetchTrades = async () => {
    try {
      const userData = localStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;
      const userId = user?.userId;

      if (!userId) return;

      const res = await fetch(`http://localhost:9090/api/bank/trade/accepted?user_id=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch trades");

      const data = await res.json();
      setTradeOrders(data);
    } catch (err) {
      console.error("Error fetching trades:", err);
      setTradeOrders([]);
    }
  };

  useEffect(() => {
    fetchTrades();
  }, []);

  // Transfer funds and verify trade
  const transferFunds = async ({ importerAccNo, exporterAccNo, tradeId, fund }) => {
    try {
      setLoadingTradeId(tradeId);

      const res = await fetch(`http://localhost:9090/api/bank/transfer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ importerAccNo, exporterAccNo, tradeId, fund }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Transfer failed");

      alert(data.message || "Transfer successful");
      fetchTrades(); // refresh trades after successful transfer
    } catch (err) {
      console.error("Failed to transfer funds:", err);
      alert(err.message);
    } finally {
      setLoadingTradeId(null);
    }
  };

  // Filter pending transfers (status ACCEPTED)
  const getPendingTransfers = () => tradeOrders.filter(order => order.status === "ACCEPTED");

  return (
    <TradeContext.Provider value={{ tradeOrders, transferFunds, getPendingTransfers, loadingTradeId }}>
      {children}
    </TradeContext.Provider>
  );
};

export const useTrades = () => useContext(TradeContext);