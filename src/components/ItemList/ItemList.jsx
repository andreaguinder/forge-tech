import React from "react";
import { useNavigate } from "react-router-dom";
import Item from "../Item/Item";

function ItemList({ productos }) {
  const navigate = useNavigate();

  return (
    <section className="contenedor-cards">
      {productos.map((prod) => {
        const categoriaUrl = prod.categoriasIds && prod.categoriasIds.length > 0 
          ? prod.categoriasIds[0] 
          : "otros";
        return (
          <Item
            key={prod.id}
            id={prod.id}
            imagenes={prod.imagenes}
            nombre={prod.nombre}
            precioLista={prod.precioLista}
            verFichaTecnica={() => navigate(`/producto/${categoriaUrl}/${prod.id}`)}
          />
        );
      })}
    </section>
  );
}

export default ItemList;