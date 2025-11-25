export async function handler(event, context) {
  try {
    const { image } = JSON.parse(event.body);

    // El token se obtiene de variables de entorno seguras en Netlify
    const apiToken = process.env.API_TOKEN;

    // Construimos la URL con el token
    const url = `https://api.apify.com/v2/acts/QUTeruze22OvNLK2a/runs?token=${apiToken}`;

    // Llamada al endpoint de Apify
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
