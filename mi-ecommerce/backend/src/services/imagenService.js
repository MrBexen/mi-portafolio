import path from "path";
import { fileURLToPath } from "url";
import { mkdir, unlink } from "fs/promises";

//obtener la ubicación actual de este archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//construir la ruta absoluta de almacenamiento
const directorioImagenes = path.resolve(__dirname, "../uploads/productos");

//Obtener la ruta donde Multer guardará los archivos
export const obtenerDirectorioImagenes = () => {
  return directorioImagenes;
};

// Construir la ruta pública que se guarda en MySQL
export const crearRutaPublicaImagen = (nombreArchivo) => {
  return `/uploads/productos/${nombreArchivo}`;
};

//eliminar un archivo físico por su nombre
export const eliminarArchivoImagen = async (nombreArchivo) => {
  const rutaArchivo = path.resolve(directorioImagenes, nombreArchivo);

  // Evitar que se intente eliminar archivos fuera de nuesrta carpeta
  if (!rutaArchivo.startsWith(`${directorioImagenes}${path.sep}`)) {
    throw new Error("Ruta de archivo no permitida");
  }

  try {
    await unlink(rutaArchivo);
  } catch (error) {
    // si el archivo ya no existe, no necesitamos eliminarlo nuevamente
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
};

//Crear el directorio donde almacenamos las imágenes
export const prepararDirectorioImagenes = async () => {
  await mkdir(directorioImagenes, { recursive: true });
};
