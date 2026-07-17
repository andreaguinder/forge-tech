import { CartContext } from "../context/CartContext";
import { useState, useEffect } from "react";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem("carrito_forge_tech");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrito_forge_tech", JSON.stringify(cart));
  }, [cart]);

  const addProductToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => String(item.id) === String(product.id)
      );

      if (existingProductIndex !== -1) {
        return prevCart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const deleteProductFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => String(item.id) !== String(productId))
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        String(item.id) === String(productId)
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    localStorage.removeItem("carrito_forge_tech");
    setCart([]);

  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addProductToCart, totalQuantity, updateQuantity, deleteProductFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;