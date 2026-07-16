// Tabs.jsx
import React, { useState } from "react";
import { Button } from "../Button";
import { ChevronUp, ChevronDown } from 'lucide-react';

// Recibimos 'activeCategory' desde afuera (inyectada desde la URL por el padre)
export const Tabs = ({ categories, activeCategory = "todas", onCategoryChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Ahora buscamos el label usando la propiedad que viene del padre
  const activeLabel = categories.find((cat) => cat.id === activeCategory)?.label || "Seleccione una opción";

  const handleTabClick = (catId) => {
    onCategoryChange(catId); // Le avisamos al contenedor que empuje la nueva URL
    setIsOpen(false);
  };

  return (
    <div className="tabs-container">
      
      {/* 1. VERSIÓN DESKTOP */}
      <div className="tabs-buttons-bar">
        {categories.map(({ id, label }) => (
          <Button
            key={id}
            // Comparamos con activeCategory
            className={`tab-button ${activeCategory === id ? "active" : ""}`}
            onClick={() => handleTabClick(id)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* 2. VERSIÓN MOBILE */}
      <div className="tabs-mobile-select-wrapper">
        <div className={`custom-select-wrapper ${isOpen ? "open" : ""}`} id="customSelect">
          
          <div className="custom-select-trigger" onClick={() => setIsOpen(!isOpen)}>
            <span>{activeLabel}</span>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {isOpen && (
            <div className="custom-options">
              {categories.map(({ id, label }) => (
                <span
                  key={id}
                  // Comparamos con activeCategory
                  className={`custom-option ${activeCategory === id ? "selected" : ""}`}
                  onClick={() => handleTabClick(id)}
                >
                  {label}
                </span>
              ))}
            </div>
          )}

        </div>

        {/* Select nativo oculto corregido para JSX */}
        <select
          name="categoriaSolicitada"
          value={activeCategory} // Controlado por la URL ahora
          onChange={(e) => handleTabClick(e.target.value)}
          className="formulario__input"
          style={{ opacity: 0, position: "absolute", zIndex: -1 }}
        >
          {categories.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Contenido inyectado */}
      <div className="tabs-content">
        {children}
      </div>

    </div>
  );
};