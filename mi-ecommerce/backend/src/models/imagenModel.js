import { db } from "../config/db.js";

// Registrar varias imágenes en una sola transacción
export const registrarImagenes = async (imagenes) => {
  // Obtener una conexión exclusiva para la transacción
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const idsImagenes = [];

    for (const imagen of imagenes) {
      const [resultado] = await connection.query(
        `INSERT INTO imagenes_productos
          (id_producto, ruta_imagen, texto_alternativo, es_principal, orden)
         VALUES (?, ?, ?, ?, ?)`,
        [
          imagen.idProducto,
          imagen.rutaImagen,
          imagen.textoAlternativo ?? null,
          imagen.esPrincipal ?? false,
          imagen.orden ?? 0,
        ],
      );

      idsImagenes.push(resultado.insertId);
    }

    // Confirmar todos los registros
    await connection.commit();

    return idsImagenes;
  } catch (error) {
    // Si algo falla, deshacer todos los registros
    await connection.rollback();
    throw error;
  } finally {
    // Liberar la conexión para que pueda reutilizarse
    connection.release();
  }
};

// Obtener todas las imágenes de un producto
export const obtenerImagenesPorProducto = async (idProducto) => {
  const [rows] = await db.query(
    `SELECT
      id_imagen,
      id_producto,
      ruta_imagen,
      texto_alternativo,
      es_principal,
      orden
     FROM imagenes_productos
     WHERE id_producto = ?
     ORDER BY es_principal DESC, orden ASC, id_imagen ASC`,
    [idProducto],
  );

  return rows;
};
