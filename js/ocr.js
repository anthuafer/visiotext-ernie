async function runOCR(imageData) {
  try {
    // Paso 1: iniciar ejecución
    const startRes = await fetch("/.netlify/functions/ocr-proxy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: imageData }),
    });
    const { runId, datasetId } = await startRes.json();

    document.getElementById(
      "ocr-output"
    ).textContent = `Ejecución iniciada: ${runId}`;

    // Paso 2: polling al proxy de estado
    let status = "READY";
    let result = null;

    while (status !== "SUCCEEDED" && status !== "FAILED") {
      await new Promise((r) => setTimeout(r, 3000)); // esperar 3s

      const checkRes = await fetch("/.netlify/functions/ocr-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ runId, datasetId }),
      });

      const checkData = await checkRes.json();
      status = checkData.status;
      result = checkData.result;

      document.getElementById("ocr-output").textContent = `Estado: ${status}`;
    }

    if (status === "SUCCEEDED") {
      document.getElementById("ocr-output").textContent = JSON.stringify(
        result,
        null,
        2
      );
    } else {
      document.getElementById("ocr-output").textContent = "La ejecución falló.";
    }
  } catch (error) {
    document.getElementById("ocr-output").textContent =
      "Error: " + error.message;
  }
}
