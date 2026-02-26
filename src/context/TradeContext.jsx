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
  // Exporters and their products
  const [exporters] = useState([
    {
      id: 'EXP001',
      companyName: 'Export Ltd USA',
      country: 'USA',
      rating: 4.8,
      verified: true,
      products: [
        {
          id: 'PRD001',
          name: 'Electronic Components',
          category: 'Electronics',
          price: 12.5,
          currency: 'USD',
          available: 10000,
          unit: 'units',
          description: 'High-quality electronic components'
        },
        {
          id: 'PRD002',
          name: 'Industrial Machinery Parts',
          category: 'Machinery',
          price: 450,
          currency: 'EUR',
          available: 500,
          unit: 'units',
          description: 'Precision machinery parts'
        }
      ]
    },
    {
      id: 'EXP002',
      companyName: 'Global Exports UK',
      country: 'UK',
      rating: 4.6,
      verified: true,
      products: [
        {
          id: 'PRD003',
          name: 'Textiles',
          category: 'Textile',
          price: 25,
          currency: 'GBP',
          available: 5000,
          unit: 'meters',
          description: 'High-quality cotton textiles'
        },
        {
          id: 'PRD004',
          name: 'Raw Cotton Bales',
          category: 'Agriculture',
          price: 85,
          currency: 'USD',
          available: 2000,
          unit: 'bales',
          description: 'Premium raw cotton'
        }
      ]
    },
    {
      id: 'EXP003',
      companyName: 'Euro Trading Co',
      country: 'Germany',
      rating: 4.9,
      verified: true,
      products: [
        {
          id: 'PRD005',
          name: 'Automotive Parts',
          category: 'Automotive',
          price: 120,
          currency: 'EUR',
          available: 3000,
          unit: 'units',
          description: 'German automotive components'
        }
      ]
    }
  ]);

  // Trade Orders
  const [tradeOrders, setTradeOrders] = useState([
    {
      id: 'TRD001',
      productName: 'Electronic Components',
      quantity: 5000,
      unitPrice: 12.5,
      currency: 'USD',
      totalAmount: 62500,
      importer: {
        id: 'IMP001',
        companyName: 'ImportCo India',
        bankId: 'BANK001'
      },
      exporter: {
        id: 'EXP001',
        companyName: 'Export Ltd USA',
        bankId: 'BANK002'
      },
      productId: 'PRD001',
      status: 'payment_initiated',
      orderDate: '2026-02-25',
      paymentStatus: 'pending',
      bankVerified: false,
      forexConverted: false,
      documents: []
    },
    {
      id: 'TRD002',
      productName: 'Industrial Machinery Parts',
      quantity: 200,
      unitPrice: 450,
      currency: 'EUR',
      totalAmount: 90000,
      importer: {
        id: 'IMP001',
        companyName: 'ImportCo India',
        bankId: 'BANK001'
      },
      exporter: {
        id: 'EXP001',
        companyName: 'Export Ltd USA',
        bankId: 'BANK002'
      },
      productId: 'PRD002',
      status: 'pending_review',
      orderDate: '2026-02-24',
      paymentStatus: 'pending',
      bankVerified: false,
      forexConverted: false,
      documents: []
    },
    {
      id: 'TRD003',
      productName: 'Raw Cotton Bales',
      quantity: 1000,
      unitPrice: 85,
      currency: 'USD',
      totalAmount: 85000,
      importer: {
        id: 'IMP001',
        companyName: 'ImportCo India',
        bankId: 'BANK001'
      },
      exporter: {
        id: 'EXP002',
        companyName: 'Global Exports UK',
        bankId: 'BANK003'
      },
      productId: 'PRD004',
      status: 'completed',
      orderDate: '2026-02-23',
      paymentStatus: 'completed',
      bankVerified: true,
      forexConverted: true,
      documents: ['invoice.pdf', 'bill_of_lading.pdf']
    }
  ]);

  // Banks
  const [banks] = useState([
    {
      id: 'BANK001',
      name: 'State Bank of India',
      swiftCode: 'SBININBB',
      country: 'India'
    },
    {
      id: 'BANK002',
      name: 'JPMorgan Chase',
      swiftCode: 'CHASUS33',
      country: 'USA'
    },
    {
      id: 'BANK003',
      name: 'HSBC UK',
      swiftCode: 'HBUKGB4B',
      country: 'UK'
    }
  ]);

  // Exchange Rates
  const [exchangeRates] = useState({
    USD: 1,
    EUR: 1.09,
    GBP: 1.26,
    INR: 0.012,
    JPY: 0.0067
  });

  // Get products available for importer
  const getAvailableProducts = () => {
    let allProducts = [];
    exporters.forEach(exporter => {
      exporter.products.forEach(product => {
        allProducts.push({
          ...product,
          exporterId: exporter.id,
          exporterName: exporter.companyName,
          exporterCountry: exporter.country,
          exporterRating: exporter.rating
        });
      });
    });
    return allProducts;
  };

  // Get orders received by exporter
  const getExporterOrders = (exporterId) => {
    return tradeOrders.filter(order => order.exporter.id === exporterId);
  };

  // Get orders by importer
  const getImporterOrders = (importerId) => {
    return tradeOrders.filter(order => order.importer.id === importerId);
  };

  // Get pending bank verifications
  const getPendingVerifications = () => {
    return tradeOrders.filter(order => 
      order.status === 'payment_initiated' && !order.bankVerified
    );
  };

  // Create new trade order
  const createTradeOrder = (orderData) => {
    const exporter = exporters.find(e => e.id === orderData.exporterId);
    const product = exporter?.products.find(p => p.id === orderData.productId);
    
    const newOrder = {
      id: `TRD${String(tradeOrders.length + 1).padStart(3, '0')}`,
      ...orderData,
      productName: product.name,
      unitPrice: product.price,
      currency: product.currency,
      totalAmount: orderData.quantity * product.price,
      importer: {
        id: 'IMP001',
        companyName: 'ImportCo India',
        bankId: 'BANK001'
      },
      exporter: {
        id: exporter.id,
        companyName: exporter.companyName,
        bankId: exporter.bankId || 'BANK002'
      },
      status: 'pending_review',
      orderDate: new Date().toISOString().split('T')[0],
      paymentStatus: 'pending',
      bankVerified: false,
      forexConverted: false,
      documents: []
    };
    
    setTradeOrders([...tradeOrders, newOrder]);
    return newOrder;
  };

  // Exporter accepts/rejects order
  const updateOrderStatus = (orderId, status) => {
    setTradeOrders(tradeOrders.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  };

  // Importer initiates payment
  const initiatePayment = (orderId) => {
    setTradeOrders(tradeOrders.map(order =>
      order.id === orderId ? { 
        ...order, 
        status: 'payment_initiated',
        paymentStatus: 'processing'
      } : order
    ));
  };

  // Bank verifies payment
  const verifyPayment = (orderId) => {
    setTradeOrders(tradeOrders.map(order =>
      order.id === orderId ? { 
        ...order, 
        bankVerified: true,
        status: 'verified'
      } : order
    ));
  };

  // Bank processes forex
  const processForex = (orderId, convertedAmount) => {
    setTradeOrders(tradeOrders.map(order =>
      order.id === orderId ? { 
        ...order, 
        forexConverted: true,
        convertedAmount,
        status: 'forex_completed'
      } : order
    ));
  };

  // Bank completes transfer
  const completeTransfer = (orderId) => {
    setTradeOrders(tradeOrders.map(order =>
      order.id === orderId ? { 
        ...order, 
        status: 'completed',
        paymentStatus: 'completed'
      } : order
    ));
  };

  // Get bank details by SWIFT code
  const validateBank = (swiftCode) => {
    return banks.find(bank => bank.swiftCode === swiftCode);
  };

  return (
    <TradeContext.Provider value={{
      exporters,
      tradeOrders,
      banks,
      exchangeRates,
      getAvailableProducts,
      getExporterOrders,
      getImporterOrders,
      getPendingVerifications,
      createTradeOrder,
      updateOrderStatus,
      initiatePayment,
      verifyPayment,
      processForex,
      completeTransfer,
      validateBank
    }}>
      {children}
    </TradeContext.Provider>
  );
};