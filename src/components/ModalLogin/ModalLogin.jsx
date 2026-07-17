import React, { useState } from "react";
import { Button } from "../Button";

export const ModalLogin = ({ isOpen, onClose, onLoginSuccess }) => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nombre.trim() || !apellido.trim()) return;


        onLoginSuccess({
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            email: `${nombre.toLowerCase()}.${apellido.toLowerCase()}@forgetech.com`
        });

        setNombre("");
        setApellido("");
        onClose();
    };

    return (
        <div className="modal-login-auth">
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

                    <h2 className="modal-title">Iniciar Sesión</h2>
                    <p className="modal-subtitle">
                        Ingresá tus datos para sincronizar tu carrito en Forge Tech.
                    </p>

                    <form onSubmit={handleSubmit} className="formulario-login">
                        <div className="form-grupo">
                            <input
                                type="text"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>

                        <div className="form-grupo">
                            <input
                                type="text"
                                placeholder="Apellido"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                required
                            />
                        </div>

                        <Button className="btn-login-submit" type="submit">
                            Ingresar
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};