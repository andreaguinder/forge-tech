import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { CartWidget } from '../CartWidget/CartWidget';
import { CartContext } from '../../context/CartContext';

export function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">FORGE <span>TECH</span></Link>
      </div>

      <div className="header__hamburguesa" onClick={() => setMenuAbierto(!menuAbierto)}>
        {menuAbierto ? <X size={28} /> : <Menu size={28} />}
      </div>

      <nav className={`header__nav ${menuAbierto ? 'header__nav--abierto' : ''}`}>
        <Link to="/" className="header__link" onClick={() => setMenuAbierto(false)}>Inicio</Link>
        <Link to="/productos" className="header__link" onClick={() => setMenuAbierto(false)}>Productos</Link>

        <Link to="/carrito" className="header__link header__link--cart" onClick={() => setMenuAbierto(false)}>
          <CartWidget />
        </Link>
      </nav>
    </header>
  );
}