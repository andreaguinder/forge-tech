import { useState } from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">FORGE <span>TECH</span></Link>
      </div>

      {/* Botón hamburguesa (solo se ve en mobile por CSS) */}
      <div className="header__hamburguesa" onClick={() => setMenuAbierto(!menuAbierto)}>
        <i className={`fa-solid ${menuAbierto ? 'fa-xmark' : 'fa-bars'}`}></i>
      </div>

      {/* Menú: Clase condicional para abrir/cerrar */}
      <nav className={`header__nav ${menuAbierto ? 'header__nav--abierto' : ''}`}>
        <Link to="/" className="header__link" onClick={() => setMenuAbierto(false)}>Inicio</Link>
        <Link to="/productos" className="header__link" onClick={() => setMenuAbierto(false)}>Productos</Link>
        <Link to="/carrito" className="header__link" onClick={() => setMenuAbierto(false)}><i className="fa-solid fa-cart-shopping"></i></Link>
      </nav>
    </header>
  );

}


