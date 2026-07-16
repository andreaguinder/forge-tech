import React from "react";
import { Button } from "../Button";

// Usamos la prop verFichaTecnica que viene desde afuera
function Item({ id, imagenes, nombre, precioLista, verFichaTecnica }) { 

  console.log("Card renderizada. ID recibido:", id);
  
  // Manejo seguro de imágenes
  const rutaRelativa = imagenes && imagenes.length > 0 ? imagenes[0] : "";
  const obtenerRutaImagen = (path) => {
    if (!path) return "";
    return path.replace("../assets/", "/src/assets/");
  };
  const srcFinal = obtenerRutaImagen(rutaRelativa);

  // Formato de moneda
  const formateadorPrecio = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return (
    <div 
      className="card" 
      // Si hacen clic en la tarjeta, ejecuta la navegación controlada por el padre
      onClick={verFichaTecnica} 
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      <img src={srcFinal} alt={nombre} />
      <h2>{nombre}</h2>
      <p>{formateadorPrecio.format(precioLista)}</p>

      <Button 
        className='btn-ficha-tecnica' 
        text='Ver Ficha Técnica' 
        onClick={(e) => {
           e.stopPropagation(); // Evita que se dispare el click del div padre
           verFichaTecnica();   // Ejecuta la navegación controlada
        }} 
        type="button"
      >
        Ver Ficha Técnica
      </Button>
    </div>
  );
}

export default Item;