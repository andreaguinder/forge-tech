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
    costoEnvioBase
}) => {
    if (step === "success") return null;

    return (
        <div className="contenedor-resumen">
            <h3>Resumen de compra</h3>

            <div className="resumen-fila">
                <p>Productos ({totalQuantity})</p>
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
                    <p className="msg-exito">Tu compra supera los $3.000.000 por lo que tenés envío gratis.</p>
                ) : (
                    <p className="msg-pendiente">
                        Sumá <strong>{formateadorPrecio.format(cuantoFaltaParaGratis)}</strong> más para conseguir <strong>Envío Gratis</strong>.
                    </p>
                )}
            </div>

            <hr />

            <div className="resumen-fila resumen-total">
                <p>Total</p>
                <p>{formateadorPrecio.format(totalFinal)}</p>
            </div>

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