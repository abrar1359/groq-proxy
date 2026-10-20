Deno.serve(async (req) => {
  const url = new URL(req.url);

  if (url.pathname === "/" || url.pathname === "") {
    return new Response("✅ Deno Groq Proxy is working!\n\nTry:\n/openai/v1/models\n/openai/v1/chat/completions", {
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }

  const targetUrl = "https://api.groq.com" + url.pathname + url.search;

  const headers = new Headers(req.headers);
  headers.set("Host", "api.groq.com");

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: req.body,
    });

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (err) {
    return new Response("Proxy Error: " + err.message, { status: 500 });
  }
});
