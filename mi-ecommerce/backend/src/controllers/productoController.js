import {
  obtenerProductos,
  obtenerProductoPorId,
} from "../models/productoModel.js";

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

//obtener producto por ID
export const buscarProducto = async (req, res) => {
  try {
    //el ID viene desde la URL
    const id = Number(req.params.id);

    //validamos que sea un número entero positivo
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        mensaje: "El ID del producto no es válido",
      });
    }

    const producto = await obtenerProductoPorId(id);

    //si no encontramos el producto
    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al buscar el producto",
    });
  }
};
