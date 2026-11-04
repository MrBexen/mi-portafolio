import express from "express";

import { listarProductos } from "../controllers/productoController.js";

const router = express.Router();

// GET: Obtener todos los productos
router.get("/", listarProductos);

export default router;
