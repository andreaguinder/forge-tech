import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import Card from "../components/Cards/Card";
import { Tabs } from "../components/Tabs/Tabs";

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

function Products() {
  const navigate = useNavigate();
  const { productos, cargando, error } = useProducts();
  const [categoriaActiva, setCategoriaActiva] = useState("todas");

  // Filtramos los productos según la categoría seleccionada
  const productosFiltrados = categoriaActiva === "todas"
    ? productos
    : productos.filter((prod) => prod.categoriasIds?.includes(categoriaActiva));

  if (cargando) return <h2>Cargando productos...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      <h1>Productos - Forge Tech</h1>
      
      {/* Pasamos la función que actualiza el estado de esta página */}
      <Tabs categories={categoriasTabs} onCategoryChange={setCategoriaActiva}>
        <section className="contenedor-cards">
          {productosFiltrados.map((prod) => (
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
      </Tabs>
    </>
  );
}

export default Products;