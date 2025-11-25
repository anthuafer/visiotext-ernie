async function runOCR(imageData) {
  try {
    // Llamada a tu función serverless en Netlify
    const response = await fetch("/.netlify/functions/ocr-proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: imageData })
    });

    if (!response.ok) {
      throw new Error("Error en la llamada al proxy OCR");
    }

    const result = await response.json();
    console.log("Resultado OCR:", result);

    // Aquí puedes renderizar el resultado en tu página
    document.getElementById("ocr-output").textContent = JSON.stringify(result, null, 2);

    return result;
  } catch (error) {
    console.error("Error en runOCR:", error);
  }
}