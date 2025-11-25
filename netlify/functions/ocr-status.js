export async function handler(event, context) {
  try {
    const { runId, datasetId } = JSON.parse(event.body);
    const apiToken = process.env.API_TOKEN;

    // Consultar estado de la ejecución
    const checkRes = await fetch(
      `https://api.apify.com/v2/actor-runs/${runId}?token=${apiToken}`
    );
    const checkData = await checkRes.json();
    const status = checkData.data.status;

    if (status === "SUCCEEDED") {
      // Obtener resultados del dataset
      const datasetRes = await fetch(
        `https://api.apify.com/v2/datasets/${datasetId}/items?token=${apiToken}`
      );
      const result = await datasetRes.json();
      return { statusCode: 200, body: JSON.stringify({ status, result }) };
    }

    return { statusCode: 200, body: JSON.stringify({ status }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
