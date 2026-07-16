import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Item/Item";

function ItemList({ productos }) {
  const navigate = useNavigate();

  return (
    <section className="contenedor-cards">
      {productos.map((prod) => (
        <Card
          key={prod.id}
          id={prod.id}
          imagenes={prod.imagenes}
          nombre={prod.nombre}
          precioLista={prod.precioLista}
          verFichaTecnica={() => navigate(`/producto/${prod.id}`)}
        />
      ))}
    </section>
  );
}

export default ItemList;