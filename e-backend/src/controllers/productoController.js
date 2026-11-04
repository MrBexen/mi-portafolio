import { obtenerProductos } from "../models/productoModel.js";

// GET: Obtener todos los productos
export const listarProductos = async (req, res) => {
  try {
    const productos = await obtenerProductos();

    res.status(200).json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);

    res.status(500).json({
      error: "No se pudieron obtener los productos",
    });
  }
};
