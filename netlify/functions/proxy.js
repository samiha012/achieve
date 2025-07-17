const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const path = event.path.replace("/.netlify/functions/proxy", "");
  const url = `http://159.223.78.83:4001${path}`;

  try {
    const response = await fetch(url, {
      method: event.httpMethod,
      headers: event.headers,
      body: event.body,
    });

    const contentType = response.headers.get("content-type");
    const body = await response.text();

    return {
      statusCode: response.status,
      headers: { "content-type": contentType },
      body,
    };
  } catch (err) {
    console.error("Proxy error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Proxy failed" }),
    };
  }
};
