import React from "react";
import { Button } from "../Button";


function Item({ id, imagenes, nombre, precioLista, verFichaTecnica }) { 

  console.log("Card renderizada. ID recibido:", id);
  

  const rutaRelativa = imagenes && imagenes.length > 0 ? imagenes[0] : "";
  const obtenerRutaImagen = (path) => {
    if (!path) return "";
    return path.replace("../assets/", "/src/assets/");
  };
  const srcFinal = obtenerRutaImagen(rutaRelativa);


  const formateadorPrecio = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return (
    <div 
      className="card" 
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
           e.stopPropagation(); 
           verFichaTecnica(); 
        }} 
        type="button"
      >
        Ver Ficha Técnica
      </Button>
    </div>
  );
}

export default Item;