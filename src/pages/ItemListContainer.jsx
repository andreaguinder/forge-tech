import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { Tabs } from "../components/Tabs/Tabs";
import Loader from '../components/Loader/Loader';
import ItemList from "../components/ItemList/ItemList"; // Importamos el nuevo componente

const categoriasTabs = [
  { id: "todas", label: "Todos los productos" },
  { id: "cat-monitores", label: "Monitores" },
  { id: "cat-placas", label: "Placas de Video" },
  { id: "cat-memorias-ram", label: "Memorias RAM" },
  { id: "cat-procesadores", label: "Procesadores" },
  { id: "cat-motherboards", label: "Motherboards" },
  { id: "cat-pc-armadas", label: "PC Armadas" },
  { id: "cat-notebooks", label: "Notebooks" },
  { id: "cat-sillas", label: "Sillas Gamer" },
  { id: "cat-otros", label: "Otros" },
];

function ItemListContainer() {
  const { productos, cargando, error } = useProducts();
  const [categoriaActiva, setCategoriaActiva] = useState("todas");

  // Filtramos los productos según la categoría seleccionada
  const productosFiltrados = categoriaActiva === "todas"
    ? productos
    : productos.filter((prod) => prod.categoriasIds?.includes(categoriaActiva));

  if (cargando) return <Loader />;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      {/* Pasamos la función que actualiza el estado de esta página */}
      <Tabs categories={categoriasTabs} onCategoryChange={setCategoriaActiva}>
        {/* Le pasamos la lista de productos filtrados al componente de presentación */}
        <ItemList productos={productosFiltrados} />
      </Tabs>
    </>
  );
}

export default ItemListContainer;