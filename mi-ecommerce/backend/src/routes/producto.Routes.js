import express from "express";

import {
  listarProductos,
  buscarProducto,
} from "../controllers/productoController.js";

import {
  validarProductoParaImagenes,
  subirImagenes,
  listarImagenes,
} from "../controllers/imagenController.js";

import { uploadImagenes } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// GET: Obtener todos los productos
router.get("/", listarProductos);
router.get("/:id", buscarProducto);

//subir imágenes de un producto
router.post(
  "/:id/imagenes",
  validarProductoParaImagenes,
  uploadImagenes,
  subirImagenes,
);

// Obtener imágenes de un producto
router.get("/:id/imagenes", validarProductoParaImagenes, listarImagenes);

export default router;
