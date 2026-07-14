import React, { createContext, useContext } from 'react';
import { useProducts } from '../hooks/useProducts';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const value = useProducts(); // Aquí se ejecuta tu hook
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);