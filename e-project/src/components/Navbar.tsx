import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  //"useState: Se usa para agregar o recordar variables de estado en componentes funcionales"
  const [isOpen, setIsOpen] = useState(false);
  //links para navbar
  const navigation = [
    { name: "Inicio", href: "#" },
    { name: "Cátalogo", href: "/C" },
    { name: "Proyectos", href: "#" },
    { name: "Contacto", href: "#" },
  ];

  return (
    <nav className="bg-slate-900 text-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logotipo */}
          <div className="flex-shrink-0 flex items-center">
            <a
              href="#"
              className="text-xl font-bold tracking-wider text-indigo-400"
            >
              Figuras y Modelos
            </a>
          </div>

          {/* Menú de Escritorio */}
          <div className="hidden md:flex space-x-8 font-medium">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Botón de Acción (Escritorio) */}
          <div className="hidden md:flex items-center">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm">
              Empezar
            </button>
          </div>

          {/* Botón Menú Móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
              aria-label="Alternar menú"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden bg-slate-800 border-t border-slate-700 px-2 pt-2 pb-4 space-y-1`}
      >
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="block text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md font-medium"
          >
            {item.name}
          </a>
        ))}
        <div className="pt-4 border-t border-slate-700 px-3">
          <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-all">
            Empezar
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
