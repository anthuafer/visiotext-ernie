export async function handler(event, context) {
  try {
    const { image } = JSON.parse(event.body);

    const apiToken = process.env.API_TOKEN;
    const url = `https://api.apify.com/v2/acts/QUTeruze22OvNLK2a/runs?token=${apiToken}`;

    // Crear ejecución en Apify
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image }),
    });

    const run = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        runId: run.data.id,
        datasetId: run.data.defaultDatasetId,
      }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
