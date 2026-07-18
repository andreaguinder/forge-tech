import React, { useContext, useState } from "react";
import { ItemCount } from "./ItemCount";
import { Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { CartContext } from "../../context/CartContext";

function ItemCart({ product }) {
  const { updateQuantity, updateCuotas, deleteProductFromCart } = useContext(CartContext);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { id, nombre, precioListaFormateado, imagenFormateada, stock, quantity, cuotasSeleccionadas, cuotas, precioLista } = product;

  const stockDisponible = stock - quantity;

  const handleQuantityChange = (nuevaCantidad) => {
    updateQuantity(id, nuevaCantidad);
  };


  const handleCuotasCustomChange = (valorCuota) => {
    updateCuotas(id, Number(valorCuota));
    setIsDropdownOpen(false); 
  };

  const obtenerRutaLimpia = (path) => {
    if (!path) return "";
    let ruta = path.replace("../assets/", "/src/assets/");
    ruta = ruta.replace("/cat-", "/");
    return ruta;
  };

  const srcFinal = obtenerRutaLimpia(imagenFormateada);

  const handleBorrarDelCarrito = () => {
    deleteProductFromCart(id);
  };

  const opcionesCuotas = [1, 3, 6, 12].filter(q => {
    if (cuotas?.cantidad) return q <= cuotas.cantidad;
    return q === 1;
  });

  const precioTotalProducto = precioLista * quantity;
  const valorCuotaTotalizado = precioTotalProducto / (cuotasSeleccionadas || 1);
  
  const formateadorMoneda = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" });


  const cuotaActivaLabel = cuotasSeleccionadas === 1 || !cuotasSeleccionadas 
    ? "En 1 pago" 
    : `${cuotasSeleccionadas} cuotas sin interés`;

  return (
    <div className="cardCart">
      <div className="cardCart__img-container">
        <img src={srcFinal} alt={nombre} />
      </div>

      <div className="cardCart__info">
        <h2>{nombre}</h2>
        <p className="cardCart__precio">{precioListaFormateado}</p>
        
        {opcionesCuotas.length > 1 && (
          <div className="cardCart__cuotas-selector">
            

            <div className={`cuotas-select-wrapper ${isDropdownOpen ? "open" : ""}`}>
              
              <div className="cuotas-select-trigger" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <span>{cuotaActivaLabel}</span>
                {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>

              {isDropdownOpen && (
                <div className="cuotas-options-dropdown">
                  {opcionesCuotas.map(q => (
                    <span
                      key={q}
                      className={`cuotas-option-item ${cuotasSeleccionadas === q ? "selected" : ""}`}
                      onClick={() => handleCuotasCustomChange(q)}
                    >
                      {q === 1 ? "En 1 pago" : `${q} cuotas sin interés`}
                    </span>
                  ))}
                </div>
              )}

            </div>


            <select 
              value={cuotasSeleccionadas || 1} 
              onChange={(e) => handleCuotasCustomChange(e.target.value)}
              style={{ opacity: 0, position: "absolute", zIndex: -1, pointerEvents: "none" }}
            >
              {opcionesCuotas.map(q => (
                <option key={q} value={q}>
                  {q === 1 ? "En 1 pago" : `${q} cuotas sin interés`}
                </option>
              ))}
            </select>

            {cuotasSeleccionadas > 1 && (
              <span className="cardCart__cuota-estimada">
                ({cuotasSeleccionadas}x {formateadorMoneda.format(valorCuotaTotalizado)})
              </span>
            )}
          </div>
        )}
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