export interface ImagenProducto {
  id_imagen: number;
  id_producto: number;
  ruta_imagen: string;
  texto_alternativo: string | null;
  es_principal: boolean | number;
  orden: number;
}

//Ditección base del backend
const API_URL = "http://localhost:3127";

// Convertir una ruta relativa en una URL completa
export const obtenerUrlImagen = (rutaImagen: string): string => {
  return `${API_URL}${rutaImagen}`;
};

//obtener las imagenes asociadas al producto
export const obtenerImagenesProducto = async (
  idProducto: number,
): Promise<ImagenProducto[]> => {
  const respuesta = await fetch(
    `${API_URL}/api/productos/${idProducto}/imagenes`,
  );

  if (!respuesta.ok) {
    throw new Error("No fue posible obtener las imágenes");
  }

  const imagenes: ImagenProducto[] = await respuesta.json();

  return imagenes;
};
