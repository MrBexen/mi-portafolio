import { useEffect, useState } from "react";
import "./Catalogo.css";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

// ==========================================
// INTERFAZ DEL PRODUCTO
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

export default function Catalogo() {
  // Estado para almacenar los productos
  const [productos, setProductos] = useState<Producto[]>([]);

  // Estado para controlar la carga
  const [cargando, setCargando] = useState(true);

  // Estado para manejar errores
  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // OBTENER PRODUCTOS DESDE NODE.JS
  // ==========================================

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await fetch("http://localhost:3127/api/productos");

        // Comprobar si la respuesta fue exitosa
        if (!respuesta.ok) {
          throw new Error("No se pudieron obtener los productos");
        }

        // Convertir respuesta JSON
        const datos: Producto[] = await respuesta.json();

        // Guardar productos en el estado
        setProductos(datos);
      } catch (error) {
        console.error("Error al obtener productos:", error);

        setError("No fue posible cargar el catálogo");
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  // ==========================================
  // MOSTRAR INFORMACION
  // ==========================================

  if (cargando) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="Catalogo-page">
      <Navbar />
      <main className="catalogo">
        <header className="catalogo-header">
          <h1>Catálogo de productos</h1>
          <p>Encuentra tu próximo proyecto de modelismo.</p>
        </header>

        {cargando && <p>Cargando productos...</p>}

        {error && <p>{error}</p>}

        {!cargando && !error && (
          <section className="productos-grid">
            {productos.map((producto) => (
              <ProductCard key={producto.id_producto} producto={producto} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
