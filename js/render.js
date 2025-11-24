// js/render.js

export function renderContent(html) {
  const content = document.getElementById("content");
  content.innerHTML = html;

  // Highlight code blocks
  document.querySelectorAll("pre code").forEach((el) => {
    try {
      hljs.highlightElement(el);
    } catch {}
  });

  // Trigger MathJax
  if (window.MathJax?.typesetPromise) {
    window.MathJax.typesetPromise();
  }
}

export function buildTOC() {
  const toc = document.getElementById("toc");
  toc.innerHTML = "";
  const headings = document.querySelectorAll("main h1, main h2, main h3");
  headings.forEach((h) => {
    const id =
      h.id ||
      h.textContent
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-");
    h.id = id;
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#" + id;
    a.textContent = h.textContent;
    li.appendChild(a);
    toc.appendChild(li);
  });
}

export function setStatus(text) {
  const el = document.getElementById("status");
  el.textContent = text;
}
