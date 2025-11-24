// js/ocr.js
// Replace OCR_ENDPOINT with your backend/serverless that calls PaddleOCR‑VL.
// The server should accept PDF and return structured layout JSON.

const OCR_ENDPOINT = 'https://your-backend.example.com/ocr'; // TODO

export async function extractOCR(file) {
  const form = new FormData();
  form.append('file', file);

  const resp = await fetch(OCR_ENDPOINT, {
    method: 'POST',
    body: form
  });

  if (!resp.ok) throw new Error('OCR request failed');
  const data = await resp.json();
  return data; // Expected schema: { pages: [ { number, blocks: [ {type, text, bbox, ...} ] } ] }
}