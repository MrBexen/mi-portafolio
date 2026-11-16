import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import DetalleProducto from "./pages/DetalleProducto";

export default function App() {
  {
    /* configuración de rutas */
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/C" element={<Catalogo />} />
      <Route path="/producto/:id" element={<DetalleProducto />} />
    </Routes>
  );
}
