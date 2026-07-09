import React, { useState, useEffect } from "react";
import Card from "../components/Cards/Card";
import ProductDetail from "./ProductDetail";
import { Tabs } from "../components/Tabs/Tabs";
import { getProducts } from "../services/products";

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
  const [productos, setProducts] = useState([]);

  const [cargando, setCargando] = useState(true);

  const [message, setMessage] = useState();

  let [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [categoriaActiva, setCategoriaActiva] = useState("todas");

  useEffect(() => {
    getProducts()
      .then((rta) => {
        if (rta.success) {
          setProducts(rta.data);
        }
      })
      .catch((error) => {
        setMessage(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  const productosFiltrados =
    categoriaActiva === "todas"
      ? productos
      : productos.filter((prod) =>
          prod.categoriasIds.includes(categoriaActiva),
        );

  const handleVerFichaTecnica = (id) => {
    const encontrado = productos.find((prod) => prod.id === id);
    setProductoSeleccionado(encontrado);
  };

  const handleVolverALaLista = () => {
    setProductoSeleccionado(null);
  };

  if (cargando) {
    return <h2>Cargando productos...</h2>;
  }

  if (message) {
    return <h2>{message}</h2>;
  }

  return (
    <>
      <h1>Productos - Forge Tech</h1>

      {productoSeleccionado === null ? (
        <>
          <Tabs
            categories={categoriasTabs}
            onCategoryChange={(catId) => setCategoriaActiva(catId)}
          >

          <section className="contenedor-cards">
            {productosFiltrados.map((prod) => (
              <Card
                key={prod.id}
                imagenes={prod.imagenes}
                nombre={prod.nombre}
                precioLista={prod.precioLista}
                verFichaTecnica={() => handleVerFichaTecnica(prod.id)}
              />
            ))}
          </section>
          </Tabs>
        </>
      ) : (
        <section>
          <ProductDetail
            productos={productoSeleccionado}
            onVolver={handleVolverALaLista}
          />
        </section>
      )}
    </>
  );
}

export default Products;
