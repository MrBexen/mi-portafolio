import { db } from "../config/db.js";

//obtener todos los productos
export const obtenerProductos = async () => {
  const [rows] = await db.query("SELECT * FROM productos");

  return rows;
};

//obtener producto por ID
export const obtenerProductoPorId = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM productos where id_producto = ?",
    [id],
  );

  return rows.length > 0 ? rows[0] : null;
};
