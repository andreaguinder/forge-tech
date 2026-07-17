import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { CartWidget } from '../CartWidget/CartWidget';
import { AuthContext } from '../../context/AuthContext';
import { ModalLogin } from '../ModalLogin/ModalLogin';
import { Button } from '../Button';

export function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const { user, login, logout } = useContext(AuthContext);

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

        <div className="header__auth-container">
          {user ? (
            <div className="user-logged-info">
              <span className="user-name">Hola, {user.nombre}!</span>
              <button className="btn-logout-header" onClick={logout}>Salir</button>
            </div>
          ) : (
            <Button
              className="btn-login-header"
              type="button"
              onClick={() => {
                setIsLoginOpen(true);
                setMenuAbierto(false);
              }}
            >
              Iniciar Sesión
            </Button>
          )}
        </div>
      </nav>

      <ModalLogin
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={login}
      />
    </header>
  );
}