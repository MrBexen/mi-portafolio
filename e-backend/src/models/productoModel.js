import { db } from "../config/db.js";

//obtener todos los productos
export const obtenerProductos = async () => {
  const [rows] = await db.query("SELECT * FROM productos");

  return rows;
};
