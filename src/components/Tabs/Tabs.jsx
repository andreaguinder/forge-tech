import React, { useState } from "react";
import { Button } from "../Button";
import { ChevronUp, ChevronDown } from 'lucide-react';


export const Tabs = ({ categories, activeCategory = "todas", onCategoryChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeLabel = categories.find((cat) => cat.id === activeCategory)?.label || "Seleccione una opción";

  const handleTabClick = (catId) => {
    onCategoryChange(catId);
    setIsOpen(false);
  };

  return (
    <div className="tabs-container">

      <div className="tabs-buttons-bar">
        {categories.map(({ id, label }) => (
          <Button
            key={id}
            className={`tab-button ${activeCategory === id ? "active" : ""}`}
            onClick={() => handleTabClick(id)}
          >
            {label}
          </Button>
        ))}
      </div>


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
                  className={`custom-option ${activeCategory === id ? "selected" : ""}`}
                  onClick={() => handleTabClick(id)}
                >
                  {label}
                </span>
              ))}
            </div>
          )}

        </div>

        <select
          name="categoriaSolicitada"
          value={activeCategory}
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

      <div className="tabs-content">
        {children}
      </div>

    </div>
  );
};