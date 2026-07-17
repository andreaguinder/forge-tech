import React from "react";
import ItemCart from "../Item/ItemCart";

export const CartItems = ({ cart }) => {
  return (
    <div className="contenedor-carrito">
      <div className="carrito-items">
        {cart.map((prod) => (
          <ItemCart key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};