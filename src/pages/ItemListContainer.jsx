
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { Tabs } from "../components/Tabs/Tabs";
import Loader from '../components/Loader/Loader';
import ItemList from "../components/ItemList/ItemList"; // Importamos el nuevo componente

const categoriasTabs = [
  { id: "todas", label: "Todos los productos" },
  { id: "monitores", label: "Monitores" },
  { id: "placas-de-video", label: "Placas de Video" },
  { id: "memorias-ram", label: "Memorias RAM" },
  { id: "procesadores", label: "Procesadores" },
  { id: "motherboards", label: "Motherboards" },
  { id: "pc-armadas", label: "PC Armadas" },
  { id: "notebooks", label: "Notebooks" },
  { id: "sillas-gamer", label: "Sillas Gamer" },
  { id: "perifericos-y-mas", label: "Otros" },
];

function ItemListContainer() {
  const { productos, cargando, error } = useProducts();
  const { categoryId } = useParams(); // Leemos el parámetro de la URL
  const navigate = useNavigate();

  const categoriaActiva = categoryId || "todas";

  const handleCategoryChange = (newCategoryId) => {
    if (newCategoryId === "todas") {
      navigate("/productos"); // Limpiamos la URL volviendo a la base
    } else {
      navigate(`/productos/${newCategoryId}`); // Actualizamos la URL con la categoría elegida
    }
  };

  // Filtramos los productos según la categoría seleccionada
  const productosFiltrados = categoriaActiva === "todas"
    ? productos
    : productos.filter((prod) => prod.categoriasIds?.includes(categoriaActiva));

  if (cargando) return <Loader />;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      {/* Pasamos la función que actualiza el estado de esta página */}
      <Tabs categories={categoriasTabs} activeCategory={categoriaActiva} onCategoryChange={handleCategoryChange}>
        {/* Le pasamos la lista de productos filtrados al componente de presentación */}
        <ItemList productos={productosFiltrados} />
      </Tabs>
    </>
  );
}

export default ItemListContainer;