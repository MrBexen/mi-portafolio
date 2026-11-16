import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./DetalleProducto.css";

// ==========================================
// 1. INTERFAZ DE TIPADO (TypeScript)
// Define cómo luce un objeto producto para evitar errores
// ==========================================
interface Producto {
  id_producto: number;
  nombre: string;
  descripcion: string | null;
  sku: string;
  precio: number;
  id_categoria: number;
  id_marca: number;
  escala: string | null;
  grado: string | null;
  dificultad: string | null;
  estado: boolean;
}

export default function DetalleProducto() {
  // ==========================================
  // 2. HOOKS Y ESTADOS
  // ==========================================

  // Extrae el ID dinámico de la URL (ej: /producto/5 -> id = "5")
  const { id } = useParams<{ id: string }>();

  // Hook de navegación para volver atrás
  const navigate = useNavigate();

  // Estados para guardar el producto, controlar la carga, errores y la cantidad a comprar
  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cantidad, setCantidad] = useState(1);

  // ==========================================
  // 3. PETICIÓN A LA API (NODE.JS)
  // ==========================================
  useEffect(() => {
    const obtenerDetalleProducto = async () => {
      try {
        // Petición al backend usando el ID capturado de la URL
        const respuesta = await fetch(
          `http://localhost:3127/api/productos/${id}`,
        );

        if (!respuesta.ok) {
          throw new Error("No se pudo obtener la información del producto");
        }

        const datos: Producto = await respuesta.json();
        setProducto(datos); // Guardamos el producto obtenido
      } catch (err) {
        console.error("Error al obtener detalle:", err);
        setError("El producto no existe o hubo un error al cargarlo.");
      } finally {
        setCargando(false); // Terminamos el estado de carga pase lo que pase
      }
    };

    if (id) {
      obtenerDetalleProducto();
    }
  }, [id]); // Se ejecuta cada vez que el ID de la URL cambia

  // ==========================================
  // 4. MANEJADOR PARA AÑADIR AL CARRITO
  // ==========================================
  const handleAgregarAlCarrito = () => {
    alert(
      `Se agregaron ${cantidad} unidad(es) de "${producto?.nombre}" al carrito.`,
    );
  };

  // ==========================================
  // 5. RENDERIZADO CONDICIONAL (Carga y Errores)
  // ==========================================
  if (cargando) {
    return <p className="cargando-texto">Cargando detalle del producto...</p>;
  }

  if (error || !producto) {
    return <p className="error-texto">{error || "Producto no encontrado"}</p>;
  }

  // ==========================================
  // 6. RENDERIZADO PRINCIPAL (VISTA DETALLE)
  // ==========================================
  return (
    <div className="detalle-page">
      <Navbar />

      <main className="detalle-container">
        {/* Botón para regresar a la página anterior */}
        <button onClick={() => navigate(-1)} className="btn-volver">
          &larr; Volver
        </button>

        <div className="detalle-card">
          <h1>{producto.nombre}</h1>
          <p className="sku">SKU: {producto.sku}</p>

          {/* Precio formateado a pesos chilenos */}
          <h2 className="precio">
            ${Number(producto.precio).toLocaleString("es-CL")}
          </h2>

          {/* Especificaciones técnicas del producto de modelismo */}
          <div className="especificaciones">
            <span>
              <strong>Escala:</strong> {producto.escala ?? "N/A"}
            </span>
            <span>
              <strong>Grado:</strong> {producto.grado ?? "N/A"}
            </span>
            <span>
              <strong>Dificultad:</strong> {producto.dificultad ?? "N/A"}
            </span>
          </div>

          {/* Descripción general */}
          <div className="descripcion-general">
            <h3>Descripción general:</h3>
            <p>
              {producto.descripcion ||
                "Sin descripción disponible para este producto."}
            </p>
          </div>

          {/* Controles de compra: Cantidad y Botón */}
          <div className="acciones-carrito">
            <div className="input-cantidad">
              <label htmlFor="cantidad">Cantidad: </label>
              <input
                id="cantidad"
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) =>
                  setCantidad(Math.max(1, parseInt(e.target.value) || 1))
                }
              />
            </div>

            <button onClick={handleAgregarAlCarrito} className="btn-agregar">
              Añadir al carrito
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
