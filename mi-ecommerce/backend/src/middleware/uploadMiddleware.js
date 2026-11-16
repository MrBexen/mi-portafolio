import multer from "multer";
import crypto from "crypto";

import {
  prepararDirectorioImagenes,
  obtenerDirectorioImagenes,
} from "../services/imagenService.js";

// Extensiones permitidas según el tipo MIME
const extensionesPermitidas = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

// Configuración del almacenamiento
const storage = multer.diskStorage({
  // Preparar la carpeta y obtener su ruta absoluta
  destination: (req, file, cb) => {
    prepararDirectorioImagenes()
      .then(() => {
        cb(null, obtenerDirectorioImagenes());
      })
      .catch((error) => {
        cb(error);
      });
  },

  // Generar un nombre único
  filename: (req, file, cb) => {
    const uniqueName = crypto.randomUUID();
    const extension = extensionesPermitidas[file.mimetype];

    cb(null, `${uniqueName}${extension}`);
  },
});

// Validar el tipo MIME declarado
const fileFilter = (req, file, cb) => {
  if (extensionesPermitidas[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error("Formato de imagen no permitido"));
  }
};

// Configuración general de Multer
const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 5,
  },
});

// Recibir hasta cinco imágenes
export const uploadImagenes = upload.array("imagenes", 5);
