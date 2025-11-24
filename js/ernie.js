// js/ernie.js
// Replace ERNIE_ENDPOINT with your backend/serverless that calls ERNIE model.
// Return a single HTML string or a JSON with { html }.

const ERNIE_ENDPOINT = "https://your-backend.example.com/ernie"; // TODO

export async function markdownToHtmlWithERNIE(markdown) {
  // Fallback: client-side render with Marked if backend disabled (for local dev)
  const USE_CLIENT_RENDER = false; // set true to skip ERNIE while testing

  if (USE_CLIENT_RENDER) {
    const htmlBody = marked.parse(markdown, { mangle: false, headerIds: true });
    // Minimal framing to ensure semantic structure
    return `
      <article class="markdown-body">
        ${htmlBody}
      </article>
    `;
  }

  const resp = await fetch(ERNIE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      markdown,
      requirements: {
        html5: true,
        wcag: true,
        responsive: true,
        toc: true,
        anchors: true,
        math: true,
        codeHighlight: true,
        singleFile: true,
      },
    }),
  });

  if (!resp.ok) throw new Error("ERNIE request failed");
  const data = await resp.json();
  if (typeof data === "string") return data;
  return data.html || "";
}
