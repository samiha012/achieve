const fetch = require("node-fetch");

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

  // Get UID from environment variable
  const CRM_UID = process.env.CRM_UID;
  const path = event.path.replace("/.netlify/functions/proxy", "");

  let url;
  // Only proxy routes that require a UID
  if (path.startsWith("/branch/all")) {
    const urlObj = new URL(`https://crm.apars.shop${path}`);
    urlObj.searchParams.set("uid", CRM_UID);
    url = urlObj.toString();
  } else if (path.startsWith("/product/achieve-courses")) {
    const urlObj = new URL(`https://crm.apars.shop${path}`);
    urlObj.searchParams.set("uid", CRM_UID);
    url = urlObj.toString();
  } else {
    // For any other route, return a 404 Not Found error
    return {
      statusCode: 404,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-headers": "Content-Type, Authorization",
        "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
      body: JSON.stringify({ error: "Route not proxied" }),
    };
  }

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