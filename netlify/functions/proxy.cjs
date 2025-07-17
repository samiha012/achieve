// Use dynamic import for node-fetch to support ESM in CommonJS
const fetch = (...args) => import('node-fetch').then(mod => mod.default(...args));

exports.handler = async function (event, context) {
  // Handle CORS preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-headers": "Content-Type, Authorization",
        "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
      body: "",
    };
  }

  const path = event.path.replace("/.netlify/functions/proxy", "/api");
  const url = `http://159.223.78.83:4001${path}`;
  console.log("Proxying to:", url);

  // Filter out problematic headers
  const { host, connection, ...filteredHeaders } = event.headers;

  // Only include body for methods that allow it
  const hasBody = !["GET", "HEAD"].includes(event.httpMethod);

  try {
    const response = await fetch(url, {
      method: event.httpMethod,
      headers: filteredHeaders,
      body: hasBody ? event.body : undefined,
    });

    const contentType = response.headers.get("content-type");
    const body = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "content-type": contentType,
        "access-control-allow-origin": "*",
        "access-control-allow-headers": "Content-Type, Authorization",
        "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
      body,
    };
  } catch (err) {
    console.error("Proxy error:", err);
    return {
      statusCode: 500,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-headers": "Content-Type, Authorization",
        "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify({ error: "Proxy failed" }),
    };
  }
}; 