import { CartContext } from "../context/CartContext";
import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from '../context/AuthContext';

const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState([]);

  const usuarioAnteriorRef = useRef(user);

  const getStorageKey = (currentUser) => {
    if (!currentUser) return "carrito_forge_tech_invitado";
    const formatoNombre = currentUser.nombre.toLowerCase().replace(/\s+/g, '_');
    const formatoApellido = currentUser.apellido.toLowerCase().replace(/\s+/g, '_');
    return `carrito_forge_tech_${formatoNombre}_${formatoApellido}`;
  };

  useEffect(() => {
    const key = getStorageKey(user);
    const localData = localStorage.getItem(key);

    if (localData) {
      setCart(JSON.parse(localData));
    } else {
      setCart([]);
    }

    usuarioAnteriorRef.current = user;
  }, [user]);

  useEffect(() => {
    if (usuarioAnteriorRef.current !== user) return;

    const key = getStorageKey(user);
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart, user]);



  const addProductToCart = (product, quantity, cuotasSeleccionadas = 1) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => String(item.id) === String(product.id)
      );

      if (existingProductIndex !== -1) {
        return prevCart.map((item, index) =>
          index === existingProductIndex
            ? { 
                ...item, 
                quantity: item.quantity + quantity,
                cuotasSeleccionadas: cuotasSeleccionadas 
              }
            : item
        );
      } else {

        return [...prevCart, { ...product, quantity, cuotasSeleccionadas }];
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


  const updateCuotas = (productId, newCuotas) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        String(item.id) === String(productId)
          ? { ...item, cuotasSeleccionadas: newCuotas }
          : item
      )
    );
  };

  const clearCart = () => {
    const key = getStorageKey(user);
    localStorage.removeItem(key);
    setCart([]);
  };

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (

    <CartContext.Provider value={{ 
      cart, 
      addProductToCart, 
      totalQuantity, 
      updateQuantity, 
      updateCuotas, 
      deleteProductFromCart, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;