import { Link } from "react-router-dom";
import "./ProductCard.css";

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
}
