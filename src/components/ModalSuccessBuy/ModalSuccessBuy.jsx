import React from "react";
import { Button } from "../Button";

export const ModalSuccessBuy = ({ isOpen, orderId, formData, totalFinal, formateadorPrecio, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-success-buy">
            <div className="modal-overlay">
                <div className="modal-content">


                    <Button
                        onClick={onClose}
                        type="button"
                        className="modal-close-x"
                        aria-label="Cerrar modal"
                    >
                        &times;
                    </Button>

                    <h2 className="modal-title">
                        ¡Muchas gracias por tu compra, {formData.nombre}!
                    </h2>
                    <p className="modal-subtitle">
                        Tu orden se ha generado con éxito en nuestro sistema.
                    </p>

                    <div className="badge-orden">
                        <span className="badge-label">ID de la Orden (Firestore):</span>
                        <h3 className="badge-id">{orderId}</h3>
                    </div>

                    <div className="detalles-envio-resumen">
                        <h4>Resumen de entrega y pago:</h4>
                        <p><strong>Destinatario:</strong> {formData.nombre} {formData.apellido} (DNI: {formData.dni})</p>
                        <p><strong>Destino:</strong> {formData.direccion} (CP: {formData.codigoPostal})</p>
                        <p><strong>Método de pago:</strong> {formData.metodoPago === "tarjeta" ? "Tarjeta de Crédito/Débito" : "Transferencia Bancaria"}</p>
                        <p><strong>Total abonado:</strong> {formateadorPrecio.format(totalFinal)}</p>
                    </div>

                    <p className="modal-subtitle envio-info">
                        El envío de tu pedido se procesará en breve. Te enviaremos un correo de confirmación con los detalles de tu compra, y el número de seguimiento.
                    </p>


                    <Button className="btn-volver-home" type="button" onClick={onClose}>
                        Finalizar
                    </Button>
                </div>
            </div>
        </div>
    );
};