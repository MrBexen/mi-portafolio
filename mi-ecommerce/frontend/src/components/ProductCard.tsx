import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

import {
  obtenerImagenesProducto,
  obtenerUrlImagen,
  type ImagenProducto,
} from "../services/imagenService";

export interface Producto {
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

interface ProductoCardProps {
  producto: Producto;
}

export default function ProductCard({ producto }: ProductoCardProps) {
  //Estado para guardar la imagen principal
  const [imagenPrincipal, setImagenPrincipal] = useState<ImagenProducto | null>(
    null,
  );

  // Obtener las imágenes asociadas al producto
  useEffect(() => {
    let componenteActivo = true;

    const cargarImagenes = async () => {
      try {
        const imagenes = await obtenerImagenesProducto(producto.id_producto);

        // El backend ya ordena primero la imagen principal
        if (componenteActivo && imagenes.length > 0) {
          setImagenPrincipal(imagenes[0]);
        }
      } catch (error) {
        console.error("Error al cargar las imágenes:", error);
      }
    };

    cargarImagenes();

    // Evitar actualizar el estado si el componente se desmonta
    return () => {
      componenteActivo = false;
    };
  }, [producto.id_producto]);

  return (
    <Link
      to={`/producto/${producto.id_producto}`}
      className="product-card-link"
    >
      <article className="producto-card">
        {/* Espacio para la imagen del producto */}
        <div className="producto-imagen">
          {imagenPrincipal ? (
            <img
              src={obtenerUrlImagen(imagenPrincipal.ruta_imagen)}
              alt={imagenPrincipal.texto_alternativo || producto.nombre}
            />
          ) : (
            <div className="producto-imagen-placeholder">
              Imagen No disponible
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="producto-info">
          <h2>{producto.nombre}</h2>
          <p>{producto.descripcion}</p>
          <span>SKU: {producto.sku}</span>

          <h3>${Number(producto.precio).toLocaleString("es-CL")}</h3>
          <div className="producto-detalles">
            <span>Escala: {producto.escala ?? "N/A"}</span>
            <span>Grado: {producto.grado ?? "N/A"}</span>
            <span>Dificultad: {producto.dificultad ?? "N/A"}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/*

return (
    <Link
      to={`/producto/${producto.id_producto}`}
      className="product-card-link"
    >
      <article className="producto-card">
        <div className="producto-info">
          <h2>{producto.nombre}</h2>
          <p>{producto.descripcion}</p>
          <span>SKU: {producto.sku}</span>

          <h3>${Number(producto.precio.toLocaleString("es-CL"))}</h3>

          <div className="producto-detalles">
            <span>Escala: {producto.escala ?? "N/A"}</span>
            <span>Grado: {producto.grado ?? "N/A"}</span>
            <span>Dificultad: {producto.dificultad ?? "N/A"}</span>
          </div>
        </div>
      </article>
    </Link>
  );
  */
