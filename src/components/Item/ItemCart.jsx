import React, { useContext } from "react";
import { ItemCount } from "./ItemCount";
import { Trash2 } from 'lucide-react';
import { CartContext } from "../../context/CartContext";

function ItemCart({ product }) { 
  const { updateQuantity } = useContext(CartContext);
    const { deleteProductFromCart, cart } = useContext(CartContext);
  
  // Desestructuramos las propiedades
  const { id, nombre, precioListaFormateado, imagenFormateada, stock, quantity } = product;

  const stockDisponible = stock - quantity;

  const handleQuantityChange = (nuevaCantidad) => {
    updateQuantity(id, nuevaCantidad);
  };

  // --- ARREGLO DE RUTA PARA IMPEDIR EL "cat-" VIEJO ---
  const obtenerRutaLimpia = (path) => {
    if (!path) return "";
    // 1. Si viene con "../assets/", lo pasa a "/src/assets/"
    let ruta = path.replace("../assets/", "/src/assets/");
    // 2. Si todavía le quedó el prefijo viejo "cat-", lo removemos (ej: cat-monitores -> monitores)
    ruta = ruta.replace("/cat-", "/");
    return ruta;
  };

  const srcFinal = obtenerRutaLimpia(imagenFormateada);

const handleBorrarDelCarrito = () => {
    deleteProductFromCart(id);
  }


  return (
    <div className="cardCart">

      <div className="cardCart__img-container">
        {/* Usamos srcFinal en lugar de imagenFormateada a secas */}
        <img src={srcFinal} alt={nombre} />
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
      <button className="cardCart__btn-borrar" onClick={handleBorrarDelCarrito}>
        <Trash2 />
      </button>
    </div>
  );
}

export default ItemCart;