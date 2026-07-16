import React, { useContext } from "react";
import { ItemCount } from "./ItemCount";
import { CartContext } from "../../context/CartContext";

function CardCart({ product }) { 
  const { updateQuantity } = useContext(CartContext);
  
  // Desestructuramos las propiedades que ya vienen formateadas desde el contexto
  const { id, nombre, precioListaFormateado, imagenFormateada, stock, quantity } = product;

  const stockDisponible = stock - quantity;

  const handleQuantityChange = (nuevaCantidad) => {
    updateQuantity(id, nuevaCantidad);
  };

  return (
    <div className="cardCart">

      <div className="cardCart__img-container">
        <img src={imagenFormateada} alt={nombre} />
      </div>


      <div className="cardCart__info">
        <h2>{nombre}</h2>

        <p className="cardCart__precio">{precioListaFormateado}</p>
      </div>


      <div className="cardCart__controles">
        <ItemCount
          stock={stock} 
          minValue={1} 
          value={quantity} 
          onChange={handleQuantityChange}
        />
        <span className="cardCart__stock">Stock disponible: {stockDisponible}</span>
      </div>
    </div>
  );
}

export default CardCart;