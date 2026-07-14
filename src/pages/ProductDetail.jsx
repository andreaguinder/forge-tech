import { useState, useContext, useEffect } from 'react'; 
import { useProductsContext } from '../context/ProductContext';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "../components/Button";
import { Counter } from "../components/Cards/Counter";
import { CartContext } from '../context/CartContext'; 
import { ChevronLeft } from 'lucide-react';

function ProductDetail({ onVolver }) {
  const { id } = useParams();
  const { productos, cargando, error } = useProductsContext();
  const navigate = useNavigate();

  // 1. Traemos la función para agregar Y el estado actual del carrito 'cart'
  const { addProductToCart, cart } = useContext(CartContext);

  const [cantidad, setCantidad] = useState(1);

  if (error) return <div className="error-container"><h2>Error: {error}</h2></div>;
  if (cargando) return <p>Cargando producto...</p>;
  
  const productoActual = productos?.find(p => String(p.id).trim() === String(id).trim());

  if (!productoActual) return <p>No se encontró el producto con ID: {id}. Por favor, verificá la URL.</p>;

  // 2. Buscamos si este producto ya está en el carrito para saber cuántos se agregaron antes
  const productoEnCarrito = cart?.find(item => String(item.id) === String(productoActual.id));
  const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.quantity : 0;

  // 3. Calculamos el stock que realmente nos queda disponible para este usuario
  const stockDisponible = productoActual.stock - cantidadEnCarrito;

  // 4. Si el stock disponible cambia (o es 0), nos aseguramos de que el contador no quede en un número inválido
  // Por ejemplo, si ya agregamos el máximo, la cantidad por defecto debería setearse en 0 o deshabilitar el botón
  const cantidadInicial = stockDisponible > 0 ? 1 : 0;

  const handleAgregarAlCarrito = () => {
    if (cantidad > 0 && cantidad <= stockDisponible) {
      addProductToCart(productoActual, cantidad);
      console.log(`Agregados ${cantidad} de "${productoActual.nombre}" al carrito.`);
      
      // Reseteamos el contador a 1 (o a lo que quede disponible) después de agregar
      setCantidad(stockDisponible - cantidad > 0 ? 1 : 0);
    }
  };

  const handleVolver = () => {
    onVolver ? onVolver() : navigate(-1);
  };

  return (
    <>
      <div>
        <Button className="btn-volver-atras" onClick={handleVolver} type="button">
          <ChevronLeft size={20} /> Volver
        </Button>
      </div>

      <div className="contenedor-product-detail">
        <div className="container-superior">
          <div className="container-img">
            <img src={productoActual.imagenFormateada} alt={productoActual.nombre} />
          </div>

          <div className="container-info">
            <h1>{productoActual.nombre}</h1>
            <h2>{productoActual.precioListaFormateado}</h2>

            {productoActual.cuotas && (
              <div className="cucarda">
                <p>¡En <span>{productoActual.cuotas.cantidad}</span> cuotas simples!</p>
                <p>De <span>{productoActual.precioCuotaFormateado}</span></p>
              </div>
            )}

            <div className="sin-impuestos">
              Precio sin impuestos: {productoActual.precioSinImpuestosFormateado}
            </div>

            <div className="contador">
              {/* 5. Le pasamos el stock REAL disponible que calculamos arriba.
                Como el Counter ahora es controlado, se comunica perfectamente con el Detail.
              */}
              <Counter 
                stock={stockDisponible} 
                minValue={stockDisponible > 0 ? 1 : 0} 
                value={cantidad} 
                onChange={setCantidad} 
              />
              <span>Stock disponible: {stockDisponible}</span>
            </div>

            <Button
              className="btn-agregar-carrito"
              onClick={handleAgregarAlCarrito} 
              type="button"
              // Se deshabilita si no hay stock disponible o si la cantidad seleccionada es 0
              disabled={stockDisponible === 0 || cantidad === 0} 
            >
              {stockDisponible === 0 ? "Sin Stock Disponible" : "Agregar al Carrito"}
            </Button>
          </div>
        </div>

        <div className="container-especificaciones">
          <ul>
            {productoActual.especificaciones?.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;