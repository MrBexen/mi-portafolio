import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, UserRound, Menu, X } from "lucide-react";

import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Enlaces principales de navegación
  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Catálogo", href: "/C" },
  ];

  // Cerrar el menú móvil al seleccionar un enlace
  const cerrarMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logotipo */}
        <div className="navbar-left">
          <Link to="/" className="logo" onClick={cerrarMenu}>
            Base Blanca
          </Link>
        </div>

        {/* Navegación de escritorio */}
        <div className="navbar-center">
          <ul className="nav-links">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link to={item.href}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Acciones del usuario */}
        <div className="navbar-right">
          <Link to="/cart" className="cart-icon" aria-label="Carrito">
            <ShoppingCart size={22} />
            <span className="cart-count">0</span>
          </Link>

          <Link to="/account" className="user-icon" aria-label="Mi cuenta">
            <UserRound size={22} />
          </Link>
        </div>

        {/* Botón de menú móvil */}
        <button
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Alternar menú"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Navegación móvil */}
      <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
        {navigation.map((item) => (
          <Link key={item.name} to={item.href} onClick={cerrarMenu}>
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
