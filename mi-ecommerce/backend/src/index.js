import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Importar rutas
import productoRoutes from "./routes/producto.Routes.js";

const app = express();
const port = process.env.PORT || 3127;

// Obtener la ubicación actual del archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());

// Permitir solicitudes desde React
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// Servir imágenes almacenadas en uploads

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Definición de rutas
app.use("/api/productos", productoRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
