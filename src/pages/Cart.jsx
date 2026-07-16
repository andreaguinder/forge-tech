import { CartContext } from '../context/CartContext'
import { useContext } from 'react'
import ItemCart from '../components/Item/ItemCart'
import { Button } from '../components/Button'

function Cart() {
  const { cart, totalQuantity } = useContext(CartContext);

  const formateadorPrecio = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  if (cart.length === 0) {
    return <p>El carrito está vacío</p>
  }

  const subtotal = cart.reduce((acc, prod) => acc + (prod.precioLista * prod.quantity), 0);
  const costoEnvio = 15000;
  const totalFinal = subtotal + costoEnvio;

  return (
    <>
      <div className="pagina-carrito">
        <div className="contenedor-carrito">
          <div className="carrito-items">
            {cart.map(prod => (
              // Le pasamos el objeto entero del producto al ItemCart
              <ItemCart key={prod.id} product={prod} />
            ))}
          </div>
        </div>

        <div className="contenedor-resumen">
          <h3>Resumen de compra</h3>

          <div className="resumen-fila">
            {/* totalQuantity ya lo traemos directo del Context */}
            <p>Productos ({totalQuantity})</p>
            <p>{formateadorPrecio.format(subtotal)}</p>
          </div>

          <div className="resumen-fila">
            <p>Envío</p>
            <p>{formateadorPrecio.format(costoEnvio)}</p>
          </div>

          <hr />

          <div className="resumen-fila resumen-total">
            <p>Total</p>
            <p>{formateadorPrecio.format(totalFinal)}</p>
          </div>

          <Button className="btn-finalizar-compra" type="button">
            Continuar compra
          </Button>
        </div>
      </div>
    </>
  )
}

export default Cart;