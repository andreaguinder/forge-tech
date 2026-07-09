
import { Button } from "../components/Button";
import { Counter } from "../components/Cards/Counter";

function ProductDetail({ productos, onVolver }) {
  // Función de ejemplo para el botón de la card
  const handleAgregarAlCarrito = (id) => {
    console.log(`Producto ${id} agregado al carrito`);
  };

  return (
    <>
      <div>
        {" "}
        <Button
          className="btn-volver-atras"
          text="Volver a Productos"
          onClick={onVolver}
          type="submit"
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </Button>
      </div>
      <div className="contenedor-product-detail">
        <div className="container-superior">
          <div className="container-img">
            <img src={productos.imagenFormateada} alt={productos.nombre} />
          </div>

          <div className="container-info">
            <h1>{productos.nombre}</h1>
            <h2>{productos.precioListaFormateado}</h2>

            <div className="cucarda">

              <div>
                ¡En <span>{productos.cuotas.cantidad}</span> cuotas simples!
              </div>
              <div>
                De <span>{productos.precioCuotaFormateado}</span>
              </div>

            </div>
            <div className="sin-impuestos">
              Precio sin impuestos {productos.precioSinImpuestosFormateado}
            </div>
            <div className="contador">
              <Counter stock={productos.stock} minValue={1} /><span>Stock: {productos.stock}</span>
            </div>
            <Button
              className="btn-agregar-carrito"
              text="Agregar al Carrito"
              onClick={() => handleAgregarAlCarrito(productos.id)}
              type="submit"
            >
              Agregar al Carrito
            </Button>
          </div>
        </div>

        <div className="container-especificaciones">
          <ul>
            {productos.especificaciones && productos.especificaciones.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
export default ProductDetail;
