import express from "express";
import cors from "cors";
// Importar rutas
import productoRoutes from "./routes/productoRoutes.js";

const app = express();

const port = process.env.PORT || 3127;

// Middleware
app.use(express.json());

// Permitir solicitudes desde React
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// Ruta principal de productos
app.use("/api/productos", productoRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
