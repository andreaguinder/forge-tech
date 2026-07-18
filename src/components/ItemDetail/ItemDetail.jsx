import React, { useState } from "react"; 
import { Button } from "../Button";
import { ItemCount } from "../Item/ItemCount";
import { ChevronLeft, ChevronUp, ChevronDown } from 'lucide-react'; 
import SwiperCarrusel from "../SwiperCarrusel/SwiperCarrusel";

function ItemDetail({
    producto,
    stockDisponible,
    cantidad,
    setCantidad,
    handleAgregarAlCarrito,
    handleVolver
}) {
    const [cuotasElegidas, setCuotasElegidas] = useState(1);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const obtenerRutaImagen = (path) => {
        if (!path) return "";
        return path.replace("../assets/", "/src/assets/");
    };

    const imagenesFormateadas = producto.imagenes?.map(img => obtenerRutaImagen(img)) || [];

    const swiperSettings = {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: imagenesFormateadas.length > 1,
        autoplay: imagenesFormateadas.length > 1 ? {
            delay: 1800,
            disableOnInteraction: false,
        } : false,
    };

    const opcionesCuotas = [1, 3, 6, 12].filter(q => {
        if (producto.cuotas?.cantidad) {
            return q <= producto.cuotas.cantidad;
        }
        return q === 1; 
    });

    const handleCuotasCustomChange = (valorCuota) => {
        setCuotasElegidas(Number(valorCuota));
        setIsDropdownOpen(false); 
    };


    const cuotaActivaLabel = cuotasElegidas === 1 
        ? "1 pago" 
        : `${cuotasElegidas} cuotas sin interés`;

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
                        {imagenesFormateadas.length > 0 ? (
                            <SwiperCarrusel
                                items={imagenesFormateadas}
                                containerClassName="detalle-producto-carrusel"
                                settings={swiperSettings}
                                showPagination={true}
                                renderItem={(imgUrl) => (
                                    <div className="wrapper-slide-img">
                                        <img src={imgUrl} alt={producto.nombre} />
                                    </div>
                                )}
                            />
                        ) : (
                            <div className="wrapper-slide-img">
                                <img src={producto.imagenFormateada} alt={producto.nombre} />
                            </div>
                        )}
                    </div>

                    <div className="container-info">
                        <h1>{producto.nombre}</h1>
                        <h2>{producto.precioListaFormateado}</h2>

                        {producto.cuotas && (
                            <div className="cucarda">
                                <p>¡Pagalo en hasta <span>{producto.cuotas.cantidad}</span> cuotas!</p>
                                <p>Cuotas sugeridas de: <span>{producto.precioCuotaFormateado}</span></p>
                            </div>
                        )}

                        <div className="sin-impuestos">
                            Precio sin impuestos: {producto.precioSinImpuestosFormateado}
                        </div>


                        {opcionesCuotas.length > 1 && (
                            <div className="selector-cuotas-detalle">
                                <label htmlFor="select-cuotas">Plan de pagos:</label>
                                
                                <div className={`cuotas-select-wrapper ${isDropdownOpen ? "open" : ""}`}>
                                    
                                    <div className="cuotas-select-trigger" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                        <span>{cuotaActivaLabel}</span>
                                        {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </div>

                                    {isDropdownOpen && (
                                        <div className="cuotas-options-dropdown">
                                            {opcionesCuotas.map(q => (
                                                <span
                                                    key={q}
                                                    className={`cuotas-option-item ${cuotasElegidas === q ? "selected" : ""}`}
                                                    onClick={() => handleCuotasCustomChange(q)}
                                                >
                                                    {q === 1 ? "1 pago" : `${q} cuotas sin interés`}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                </div>


                                <select 
                                    id="select-cuotas"
                                    value={cuotasElegidas} 
                                    onChange={(e) => handleCuotasCustomChange(e.target.value)}
                                    className="select-cuotas-custom"
                                    style={{ opacity: 0, position: "absolute", zIndex: -1, pointerEvents: "none" }}
                                >
                                    {opcionesCuotas.map(q => (
                                        <option key={q} value={q}>
                                            {q === 1 ? "1 pago" : `${q} cuotas sin interés`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

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
                            onClick={() => handleAgregarAlCarrito(cantidad, cuotasElegidas)}
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