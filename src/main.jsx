import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { TradeProvider } from './services/TradeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TradeProvider>
      <App />
    </TradeProvider>
  </React.StrictMode>
)