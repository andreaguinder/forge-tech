import { CartContext } from "../context/CartContext";
import { useState } from "react";

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);


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


    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (

        <CartContext.Provider value={{ cart, addProductToCart, totalQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;