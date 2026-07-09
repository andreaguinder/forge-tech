
import React from "react";
import { Button } from "../Button";

function Card({ imagenes, nombre, precioLista, agregarAlCarrito, verFichaTecnica }) {


 const rutaRelativa = imagenes && imagenes.length > 0 ? imagenes[0] : "";


  const obtenerRutaImagen = (path) => {
    if (!path) return "";

    const cleanPath = path.replace("../assets/", "/src/assets/");
    return cleanPath;
  };

  const srcFinal = obtenerRutaImagen(rutaRelativa);

  const formateadorPrecio = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return (
    
    <div className="card" onClick={verFichaTecnica} style={{ cursor: 'pointer', position: 'relative' }}>
      <img src={srcFinal} alt={nombre} />
      <h2>{nombre}</h2>
      <p>{formateadorPrecio.format(precioLista)}</p>
      <Button className='btn-ficha-tecnica' text='Ver Ficha Técnica' onClick={verFichaTecnica} type="submit">
        Ver Ficha Técnica
      </Button>
    </div>

  );
}

export default Card;
