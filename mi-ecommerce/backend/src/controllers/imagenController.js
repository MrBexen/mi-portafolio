import {
  registrarImagenes,
  obtenerImagenesPorProducto,
} from "../models/imagenModel.js";

import { obtenerProductoPorId } from "../models/productoModel.js";
import {
  crearRutaPublicaImagen,
  eliminarArchivoImagen,
} from "../services/imagenService.js";

// validar que el ID sea correcto y que el producto exista
export const validarProductoParaImagenes = async (req, res, next) => {
  try {
    const idProducto = Number(req.params.id);

    // El ID debe ser un número entero mayor que cero
    if (!Number.isInteger(idProducto) || idProducto <= 0) {
      return res.status(400).json({
        mensaje: "El ID del producto no es valido",
      });
    }

    const producto = await obtenerProductoPorId(idProducto);

    if (!producto) {
      return res.status(404).json({
        mensaje: "No se encontró el producto",
      });
    }

    // Guardamos el ID validado para utilizarlo después
    req.idProducto = idProducto;

    next();
  } catch (error) {
    console.error("Error al validar el producto:", error);

    return res.status(500).json({
      mensaje: "Error al verificar el producto",
    });
  }
};

// Subir imágenes y registrar sus datos en MySQL
export const subirImagenes = async (req, res) => {
  const archivos = req.files || [];

  try {
    if (archivos.length === 0) {
      return res.status(400).json({
        mensaje: "Debes seleccionar al menos una imagen",
      });
    }

    const imagenes = archivos.map((archivo, index) => ({
      idProducto: req.idProducto,
      rutaImagen: crearRutaPublicaImagen(archivo.filename),
      textoAlternativo: req.body.textoAlternativo || null,
      esPrincipal: false,
      orden: index,
    }));

    // Registrar todas las imágenes en una transacción
    const idsImagenes = await registrarImagenes(imagenes);

    // Consultar las imágenes ta registradas
    const imagenesGuardadas = await obtenerImagenesPorProducto(req.idProducto);

    return res.status(201).json({
      mensaje: "Imágenes subidas correctamente",
      idsImagenes,
      imagenes: imagenesGuardadas,
    });
  } catch (error) {
    console.error("Error al subir las imágenes:", error);

    // Si falla el registro en MySQL, eliminar los archivos físicos
    await Promise.allSettled(
      archivos.map((archivo) => eliminarArchivoImagen(archivo.filename)),
    );

    return res.status(500).json({
      mensaje: "No fue posible registrar las imágenes",
    });
  }
};

//obtener las imágenes asociadas a un producto
export const listarImagenes = async (req, res) => {
  try {
    const imagenes = await obtenerImagenesPorProducto(req.idProducto);

    return res.status(200).json(imagenes);
  } catch (error) {
    console.error("Error al obtener las imágenes:", error);

    return res.status(500).json({
      mensaje: "No fue posible obtener las imágenes",
    });
  }
};
