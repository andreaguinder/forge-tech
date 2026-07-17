import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ProductsProvider } from './context/ProductContext';
import CartProvider from './providers/CartProvider';
import { AuthProvider } from './context/AuthContext'; 
import './styles/main.scss' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> 
      <CartProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)