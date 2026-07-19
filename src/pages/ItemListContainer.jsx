
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { Tabs } from "../components/Tabs/Tabs";
import Loader from '../components/Loader/Loader';
import ItemList from "../components/ItemList/ItemList";

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
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const categoriaActiva = categoryId || "todas";

  const handleCategoryChange = (newCategoryId) => {
    if (newCategoryId === "todas") {
      navigate("/productos");
    } else {
      navigate(`/productos/${newCategoryId}`);
    }
  };


  const productosFiltrados = categoriaActiva === "todas"
    ? productos
    : productos.filter((prod) => prod.categoriasIds?.includes(categoriaActiva));

  if (cargando) return <Loader className="loader-productos" />;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      <Tabs categories={categoriasTabs} activeCategory={categoriaActiva} onCategoryChange={handleCategoryChange}>
        <ItemList productos={productosFiltrados} />
      </Tabs>
    </>
  );
}

export default ItemListContainer;