import React from "react";
import { Button } from "../Button";
import { ItemCount } from "../Item/ItemCount";
import { ChevronLeft } from 'lucide-react';

function ItemDetail({
    producto,
    stockDisponible,
    cantidad,
    setCantidad,
    handleAgregarAlCarrito,
    handleVolver
}) {
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
                        <img src={producto.imagenFormateada} alt={producto.nombre} />
                    </div>

                    <div className="container-info">
                        <h1>{producto.nombre}</h1>
                        <h2>{producto.precioListaFormateado}</h2>

                        {producto.cuotas && (
                            <div className="cucarda">
                                <p>¡En <span>{producto.cuotas.cantidad}</span> cuotas simples!</p>
                                <p>De <span>{producto.precioCuotaFormateado}</span></p>
                            </div>
                        )}

                        <div className="sin-impuestos">
                            Precio sin impuestos: {producto.precioSinImpuestosFormateado}
                        </div>

                        <div className="contador">
                            {stockDisponible > 0 && (
                                <>
                                    <ItemCount
                                        stock={stockDisponible}
                                        minValue={1}
                                        value={cantidad}
                                        onChange={setCantidad}
                                    />
                                    <span>Stock disponible: {stockDisponible}</span>
                                </>
                            )}
                        </div>

                        <Button
                            className="btn-agregar-carrito"
                            onClick={handleAgregarAlCarrito}
                            type="button"
                            disabled={stockDisponible === 0 || cantidad === 0}
                        >
                            {stockDisponible === 0 ? "Sin Stock Disponible" : "Agregar al Carrito"}
                        </Button>
                    </div>
                </div>

                <div className="container-especificaciones">
                    <ul>
                        {producto.especificaciones?.map((spec, index) => (
                            <li key={index}>{spec}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ItemDetail;