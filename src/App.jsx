import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TradeProvider } from './context/TradeContext';
import Home from './pages/Home';
import ImporterDashboard from './pages/importer/ImporterDashboard';
import ExporterDashboard from './pages/exporter/ExporterDashboard';
import BankDashboard from './pages/bank/BankDashboard';

function App() {
  return (
    <TradeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/importer/dashboard" element={<ImporterDashboard />} />
          <Route path="/exporter/dashboard" element={<ExporterDashboard />} />
          <Route path="/bank/dashboard" element={<BankDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </TradeProvider>
  );
}

export default App;