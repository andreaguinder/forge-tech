import React from "react";
import { Button } from "../Button";

export const CartInfo = ({
    totalQuantity,
    subtotal,
    costoEnvio,
    totalFinal,
    formateadorPrecio,
    step,
    onNextStep,
    onBackStep,
    esEnvioGratis,
    cuantoFaltaParaGratis,
    costoEnvioBase,
    cartItems = [],
    metodoPagoSeleccionado = "tarjeta"
}) => {
    if (step === "success") return null;


    const resumenPlanes = {};
    let totalEnUnPago = 0;
    let plazoMaximoCuotas = 1;


    cartItems.forEach(item => {
        const cuotas = item.cuotasSeleccionadas || 1;
        const subtotalItem = item.precioLista * item.quantity;

        if (cuotas > 1) {
            if (!resumenPlanes[cuotas]) {
                resumenPlanes[cuotas] = 0;
            }
            resumenPlanes[cuotas] += subtotalItem;
            if (cuotas > plazoMaximoCuotas) plazoMaximoCuotas = cuotas;
        } else {
            totalEnUnPago += subtotalItem;
        }
    });

    const tieneFinanciacion = Object.keys(resumenPlanes).length > 0 && (step === "cart" || metodoPagoSeleccionado === "tarjeta");

    const cronogramaPagos = [];
    
    if (tieneFinanciacion) {

        const mesesDeCorte = Object.keys(resumenPlanes).map(Number).sort((a, b) => a - b);
        
        let mesInicio = 1;
        
        mesesDeCorte.forEach((mesCorte) => {

            let cuotaMensualRango = 0;
            Object.entries(resumenPlanes).forEach(([cuotas, monto]) => {
                if (Number(cuotas) >= mesCorte) {
                    cuotaMensualRango += monto / Number(cuotas);
                }
            });

            cronogramaPagos.push({
                desde: mesInicio,
                hasta: mesCorte,
                montoMensual: cuotaMensualRango
            });

            mesInicio = mesCorte + 1;
        });
    }


    const cargoEnvio = esEnvioGratis ? 0 : costoEnvio;
    const cuotaMesUno = cronogramaPagos.length > 0 ? cronogramaPagos[0].montoMensual : 0;
    const totalPrimerVencimiento = cuotaMesUno + totalEnUnPago + cargoEnvio;

    return (
        <div className="contenedor-resumen">
            <h3>Resumen de compra</h3>

            <div className="resumen-fila">
                <p>Subtotal Productos ({totalQuantity})</p>
                <p>{formateadorPrecio.format(subtotal)}</p>
            </div>

            <div className="resumen-fila resumen-envio">
                <p>Envío</p>
                {esEnvioGratis ? (
                    <p className="envio-gratis-layout">
                        <span className="precio-tachado">{formateadorPrecio.format(costoEnvioBase)}</span>
                        <span className="texto-gratis">Gratis</span>
                    </p>
                ) : (
                    <p>{formateadorPrecio.format(costoEnvio)}</p>
                )}
            </div>

            <div className="alerta-envio-info">
                {esEnvioGratis ? (
                    <p className="msg-exito">¡Buenísimo! Tu compra tiene envío gratis.</p>
                ) : (
                    <p className="msg-pendiente">
                        Estás a solo <strong>{formateadorPrecio.format(cuantoFaltaParaGratis)}</strong> de conseguir <strong>Envío Gratis</strong>.
                    </p>
                )}
            </div>


            {tieneFinanciacion && (
                <div className="resumen-financiacion-avanzado">
                    <h4>Cronograma estimado de tus resúmenes:</h4>
                    <div className="lista-planes">
                        

                        {totalEnUnPago > 0 && (
                            <div className="fila-plan un-pago-alerta">
                                <p>Al contado / 1 pago (vence este mes):</p>
                                <p><strong>{formateadorPrecio.format(totalEnUnPago)}</strong></p>
                            </div>
                        )}


                        {cronogramaPagos.map((rango, index) => {
                            const esMismoMes = rango.desde === rango.hasta;
                            
                            return (
                                <div key={index} className="fila-plan">
                                    <p>
                                        {esMismoMes ? (
                                            <>Mes <strong>{rango.desde}</strong> vas a pagar:</>
                                        ) : (
                                            <>Meses <strong>{rango.desde} a {rango.hasta}</strong> vas a pagar:</>
                                        )}
                                    </p>
                                    <p><strong>{formateadorPrecio.format(rango.montoMensual)} / mes</strong></p>
                                    
                                    {index === 0 && cargoEnvio > 0 && (
                                        <small className="monto-financiado-sub">
                                            *(En el Mes 1 se le sumarán los {formateadorPrecio.format(cargoEnvio)} del envío)
                                        </small>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <hr />


            {tieneFinanciacion ? (
                <>
                    <div className="resumen-fila resumen-primer-pago">
                        <div>
                            <p className="titulo-pago-mes"><strong>Total a pagar este mes:</strong></p>
                            <small className="descripcion-pago-mes">(Cuotas concurrentes + envío)</small>
                        </div>
                        <p className="monto-destacado-mes">{formateadorPrecio.format(totalPrimerVencimiento)}</p>
                    </div>
                    
                    <div className="resumen-fila resumen-total-diferido">
                        <p>Total final diferido de la orden:</p>
                        <p>{formateadorPrecio.format(totalFinal)}</p>
                    </div>
                </>
            ) : (
                <div className="resumen-fila resumen-total">
                    <p>Total</p>
                    <p>{formateadorPrecio.format(totalFinal)}</p>
                </div>
            )}

            <div className="acciones-resumen">
                <Button
                    className="btn-finalizar-compra"
                    type="button"
                    onClick={onNextStep}
                >
                    {step === "cart" ? "Continuar compra" : "Finalizar compra"}
                </Button>

                {step === "checkout" && (
                    <Button
                        type="button"
                        className="btn-volver-carrito"
                        onClick={onBackStep}
                    >
                        Volver a modificar productos
                    </Button>
                )}
            </div>
        </div>
    );
};