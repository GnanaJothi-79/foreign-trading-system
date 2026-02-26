import React, { createContext, useState, useContext } from 'react';

const TradeContext = createContext();

export const useTrades = () => {
  const context = useContext(TradeContext);
  if (!context) {
    throw new Error('useTrades must be used within a TradeProvider');
  }
  return context;
};

export const TradeProvider = ({ children }) => {
  const [trades, setTrades] = useState([
    {
      id: 'TRD001',
      productName: 'Electronic Components',
      quantity: 5000,
      unitPrice: 12.5,
      currency: 'USD',
      totalAmount: 62500,
      importer: 'ImportCo India',
      exporter: 'Export Ltd USA',
      status: 'payment_initiated',
      date: '2026-02-25',
      documents: []
    },
    {
      id: 'TRD002',
      productName: 'Industrial Machinery Parts',
      quantity: 200,
      unitPrice: 450,
      currency: 'EUR',
      totalAmount: 90000,
      importer: 'ImportCo India',
      exporter: 'Export Ltd USA',
      status: 'pending_review',
      date: '2026-02-24',
      documents: []
    },
    {
      id: 'TRD003',
      productName: 'Raw Cotton Bales',
      quantity: 1000,
      unitPrice: 85,
      currency: 'USD',
      totalAmount: 85000,
      importer: 'ImportCo India',
      exporter: 'Export Ltd USA',
      status: 'paid',
      date: '2026-02-23',
      documents: ['invoice.pdf', 'bill_of_lading.pdf']
    }
  ]);

  const [notifications, setNotifications] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({
    USD: 1,
    EUR: 1.09,
    GBP: 1.26,
    INR: 0.012,
    JPY: 0.0067
  });

  // Create new trade order (Importer)
  const createTradeOrder = (orderData) => {
    const newTrade = {
      id: `TRD${String(trades.length + 1).padStart(3, '0')}`,
      ...orderData,
      totalAmount: orderData.quantity * orderData.unitPrice,
      status: 'pending_review',
      date: new Date().toISOString().split('T')[0],
      documents: []
    };
    
    setTrades([...trades, newTrade]);
    
    // Notify exporter
    addNotification({
      userId: 'exporter',
      message: `New trade order received: ${orderData.productName}`,
      tradeId: newTrade.id,
      type: 'new_order'
    });
    
    return newTrade;
  };

  // Accept/Reject trade (Exporter)
  const updateTradeStatus = (tradeId, status) => {
    const updatedTrades = trades.map(trade => 
      trade.id === tradeId ? { ...trade, status } : trade
    );
    setTrades(updatedTrades);

    if (status === 'accepted') {
      addNotification({
        userId: 'importer',
        message: `Trade order accepted. Please initiate payment.`,
        tradeId,
        type: 'order_accepted'
      });
      
      addNotification({
        userId: 'bank',
        message: `New transaction ready for verification`,
        tradeId,
        type: 'verify_funds'
      });
    }
  };

  // Initiate payment (Importer)
  const initiatePayment = (tradeId) => {
    const updatedTrades = trades.map(trade =>
      trade.id === tradeId ? { ...trade, status: 'payment_initiated' } : trade
    );
    setTrades(updatedTrades);

    addNotification({
      userId: 'bank',
      message: `Payment initiated - needs verification`,
      tradeId,
      type: 'verify_funds'
    });
  };

  // Verify funds and convert currency (Bank)
  const verifyAndConvertFunds = (tradeId, convertedAmount) => {
    const updatedTrades = trades.map(trade =>
      trade.id === tradeId ? { 
        ...trade, 
        status: 'verified',
        convertedAmount,
        verifiedDate: new Date().toISOString()
      } : trade
    );
    setTrades(updatedTrades);

    addNotification({
      userId: 'exporter',
      message: `Funds verified. Ready to ship.`,
      tradeId,
      type: 'funds_verified'
    });
  };

  // Transfer funds (Bank)
  const transferFunds = (tradeId) => {
    const updatedTrades = trades.map(trade =>
      trade.id === tradeId ? { ...trade, status: 'completed' } : trade
    );
    setTrades(updatedTrades);

    addNotification({
      userId: 'importer',
      message: `Payment completed. Documents ready.`,
      tradeId,
      type: 'payment_completed'
    });

    addNotification({
      userId: 'exporter',
      message: `Payment received. Shipment confirmed.`,
      tradeId,
      type: 'payment_received'
    });
  };

  // Add document to trade
  const addDocument = (tradeId, document) => {
    const updatedTrades = trades.map(trade =>
      trade.id === tradeId ? { 
        ...trade, 
        documents: [...trade.documents, document] 
      } : trade
    );
    setTrades(updatedTrades);
  };

  // Add notification
  const addNotification = (notification) => {
    setNotifications([...notifications, { ...notification, id: Date.now(), read: false }]);
  };

  // Mark notification as read
  const markNotificationRead = (notificationId) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  // Get trades by status
  const getTradesByStatus = (status) => {
    return trades.filter(trade => trade.status === status);
  };

  // Get trade by ID
  const getTradeById = (id) => {
    return trades.find(trade => trade.id === id);
  };

  // Currency conversion
  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    const usdAmount = amount / exchangeRates[fromCurrency];
    return usdAmount * exchangeRates[toCurrency];
  };

  return (
    <TradeContext.Provider value={{
      trades,
      notifications,
      exchangeRates,
      createTradeOrder,
      updateTradeStatus,
      initiatePayment,
      verifyAndConvertFunds,
      transferFunds,
      addDocument,
      getTradesByStatus,
      getTradeById,
      convertCurrency,
      markNotificationRead
    }}>
      {children}
    </TradeContext.Provider>
  );
};