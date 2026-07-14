// Tabs.jsx
import React, { useState } from "react";
import { Button } from "../Button";
import { ChevronUp, ChevronDown } from 'lucide-react';

export const Tabs = ({ categories, onCategoryChange, children }) => {
  const [activeTab, setActiveTab] = useState("todas");
  const [isOpen, setIsOpen] = useState(false);

  // Buscamos el label activo de forma segura
  const activeLabel = categories.find((cat) => cat.id === activeTab)?.label || "Seleccione una opción";

  const handleTabClick = (catId) => {
    setActiveTab(catId);
    onCategoryChange(catId);
    setIsOpen(false);
  };

  return (
    <div className="tabs-container">
      
      {/* 1. VERSIÓN DESKTOP */}
      <div className="tabs-buttons-bar">
        {categories.map(({ id, label }) => (
          <Button
            key={id}
            className={`tab-button ${activeTab === id ? "active" : ""}`}
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
                  className={`custom-option ${activeTab === id ? "selected" : ""}`}
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
          value={activeTab}
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