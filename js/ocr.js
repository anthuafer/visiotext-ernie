// js/ocr.js
// Ejemplo de consumo del endpoint PaddleOCR-VL en Apify

const API_TOKEN = process.env.API_TOKEN;
const OCR_ENDPOINT = `https://api.apify.com/v2/acts/yeekal~paddleocr-vl/runs?token=${API_TOKEN}`;

/**
 * Envía un PDF al endpoint de PaddleOCR-VL y devuelve el JSON con texto y layout.
 * @param {File} file - Archivo PDF seleccionado por el usuario
 * @returns {Promise<Object>} OCR JSON con bloques de texto, tablas, imágenes, etc.
 */
export async function extractOCR(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(OCR_ENDPOINT, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error en la petición OCR");
  }

  const data = await response.json();
  return data; // JSON con estructura: { pages: [ { blocks: [...] } ] }
}
