import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

function Card({ id, imagenes, nombre, precioLista }) { 

  console.log("Card renderizada. ID recibido:", id);
  
  const navigate = useNavigate();
  
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

  const handleNavegarAlDetalle = () => {
    // Validación: si el id no existe, no hacemos nada o avisamos
    if (!id) {
      console.warn("Card: Intentaste navegar sin un ID válido");
      return;
    }
    navigate(`/producto/${id}`);
  };

  return (
    <div 
      className="card" 
      onClick={handleNavegarAlDetalle} 
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
           handleNavegarAlDetalle();
        }} 
        type="button"
      >
        Ver Ficha Técnica
      </Button>
    </div>
  );
}

export default Card;