import { useState, useContext } from 'react'; 
import { useProductsContext } from '../context/ProductContext';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; 
import Loader from '../components/Loader/Loader';
import ItemDetail from '../components/ItemDetail/ItemDetail'; // Importamos el de presentación

function ItemDetailContainer({ onVolver }) {
  const { categoryId, id } = useParams();
  const { productos, cargando, error } = useProductsContext();
  const navigate = useNavigate();

  const { addProductToCart, cart } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);

  if (error) return <div className="error-container"><h2>Error: {error}</h2></div>;
  if (cargando) return <Loader/>;
  
  const productoActual = productos?.find(p => String(p.id).trim() === String(id).trim());

  if (!productoActual) return <p>No se encontró el producto con ID: {id}. Por favor, verificá la URL.</p>;

  const productoEnCarrito = cart?.find(item => String(item.id) === String(productoActual.id));
  const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.quantity : 0;
  const stockDisponible = productoActual.stock - cantidadEnCarrito;

  const handleAgregarAlCarrito = () => {
    if (cantidad > 0 && cantidad <= stockDisponible) {
      addProductToCart(productoActual, cantidad);
      console.log(`Agregados ${cantidad} de "${productoActual.nombre}" al carrito.`);
      setCantidad(stockDisponible - cantidad > 0 ? 1 : 0);
    }
  };

  const handleVolver = () => {
    onVolver ? onVolver() : navigate(-1);
  };

  return (
    <ItemDetail 
      producto={productoActual}
      stockDisponible={stockDisponible}
      cantidad={cantidad}
      setCantidad={setCantidad}
      handleAgregarAlCarrito={handleAgregarAlCarrito}
      handleVolver={handleVolver}
    />
  );
}

export default ItemDetailContainer;