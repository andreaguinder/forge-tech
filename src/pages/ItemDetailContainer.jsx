import { useState, useContext } from 'react'; 
import { useProductsContext } from '../context/ProductContext';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; 
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader/Loader';
import ItemDetail from '../components/ItemDetail/ItemDetail';
import { ModalLogin } from '../components/ModalLogin/ModalLogin'; 

function ItemDetailContainer({ onVolver }) {
  const { id } = useParams();
  const { productos, cargando, error } = useProductsContext();
  const navigate = useNavigate();

  const { addProductToCart, cart } = useContext(CartContext);
  const { user, login } = useContext(AuthContext); 
  
  const [cantidad, setCantidad] = useState(1);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); 

  if (error) return <div className="error-container"><h2>Error: {error}</h2></div>;
  if (cargando) return <Loader/>;
  
  const productoActual = productos?.find(p => String(p.id).trim() === String(id).trim());
  if (!productoActual) return <p>No se encontró el producto.</p>;

  const productoEnCarrito = cart?.find(item => String(item.id) === String(productoActual.id));
  const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.quantity : 0;
  const stockDisponible = productoActual.stock - cantidadEnCarrito;

  const handleAgregarAlCarrito = () => {

    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    if (cantidad > 0 && cantidad <= stockDisponible) {
      addProductToCart(productoActual, cantidad);
      setCantidad(stockDisponible - cantidad > 0 ? 1 : 0);
    }
  };

  const handleVolver = () => {
    onVolver ? onVolver() : navigate(-1);
  };

  return (
    <>
      <ItemDetail 
        producto={productoActual}
        stockDisponible={stockDisponible}
        cantidad={cantidad}
        setCantidad={setCantidad}
        handleAgregarAlCarrito={handleAgregarAlCarrito}
        handleVolver={handleVolver}
      />


      <ModalLogin 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={login}
      />
    </>
  );
}

export default ItemDetailContainer;