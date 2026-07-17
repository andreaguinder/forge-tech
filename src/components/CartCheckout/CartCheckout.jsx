import React, { useState } from "react";

export const CartCheckout = ({ formData, setFormData }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="contenedor-checkout">
            <h3>Datos personales</h3>
            <p className="subtitulo">
                Completá los datos para procesar tu orden.
            </p>

            <form id="form-checkout-orden" className="formulario-checkout" onSubmit={(e) => e.preventDefault()}>

                <div className="form-grupo form-grupo-row">
                    <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
                    <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
                </div>

                <div className="form-grupo form-grupo-row">
                    <input type="tel" name="telefono" placeholder="Teléfono" value={formData.telefono} onChange={handleChange} required />
                    <input type="text" name="dni" placeholder="DNI para Facturación" value={formData.dni} onChange={handleChange} required />
                </div>

                <div className="form-grupo">
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                </div>


                <h4>Dirección de Entrega</h4>
                <div className="form-grupo form-grupo-row">
                    <input type="text" name="direccion" placeholder="Calle y Altura" value={formData.direccion} onChange={handleChange} required />
                    <input type="text" name="codigoPostal" placeholder="Código Postal" value={formData.codigoPostal} onChange={handleChange} required />
                </div>


                <h4>Método de Pago</h4>
                <div className="form-grupo-radio">
                    <label>
                        <input
                            type="radio"
                            name="metodoPago"
                            value="transferencia"
                            checked={formData.metodoPago === "transferencia"}
                            onChange={handleChange}
                        />
                        Transferencia Bancaria
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="metodoPago"
                            value="tarjeta"
                            checked={formData.metodoPago === "tarjeta"}
                            onChange={handleChange}
                        />
                        Tarjeta de Crédito / Débito
                    </label>
                </div>


                {formData.metodoPago === "tarjeta" && (
                    <div className="datos-tarjeta-falsa">
                        <h4>Datos de la Tarjeta (Simulados)</h4>
                        <input 
                            type="text" 
                            name="tarjetaNumero" 
                            placeholder="0000 0000 0000 0000" 
                            value={formData.tarjetaNumero} 
                            onChange={handleChange} 
                            style={{ width: "100%", marginBottom: "10px" }} 
                            required 
                        />
                        <div className="form-grupo">
                            <input 
                                type="text" 
                                name="tarjetaVence" 
                                placeholder="MM/AA" 
                                value={formData.tarjetaVence} 
                                onChange={handleChange} 
                                required 
                            />
                            <input 
                                type="text" 
                                name="tarjetaCcv" 
                                placeholder="CCV" 
                                value={formData.tarjetaCcv} 
                                onChange={handleChange} 
                                required 
                            />
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};