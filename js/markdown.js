// js/markdown.js

function normalizeText(s) {
  return (s || "")
    .replace(/\s+/g, " ")
    .replace(/-\s*\n/g, "") // de-hyphenation
    .trim();
}

function blockToMarkdown(block) {
  const t = block.type?.toLowerCase();
  const text = normalizeText(block.text);

  switch (t) {
    case "title":
    case "heading1":
      return `# ${text}\n\n`;
    case "heading2":
      return `## ${text}\n\n`;
    case "heading3":
      return `### ${text}\n\n`;
    case "list-item":
      return `- ${text}\n`;
    case "table": {
      // Expect block.table as 2D array
      const rows = block.table || [];
      if (!rows.length) return "";
      const header = rows[0].map((c) => String(c || "").trim()).join(" | ");
      const sep = rows[0].map(() => "---").join(" | ");
      const body = rows
        .slice(1)
        .map((r) => r.map((c) => String(c || "").trim()).join(" | "))
        .join("\n");
      return `${header}\n${sep}\n${body}\n\n`;
    }
    case "image": {
      const alt = block.caption || "Image";
      const src = block.src || block.path || "";
      return src ? `![${alt}](${src})\n\n` : "";
    }
    case "math":
      return `\n\\[ ${text} \\]\n\n`;
    case "code":
      return `\n\`\`\`\n${text}\n\`\`\`\n\n`;
    default:
      return `${text}\n\n`;
  }
}

export function ocrJsonToMarkdown(ocrJson) {
  if (!ocrJson?.pages?.length)
    return "# Documento\n\n(No se encontraron páginas.)\n";
  const md = [];

  for (const page of ocrJson.pages) {
    md.push(`\n---\n\n`); // optional page separator
    const blocks = (page.blocks || []).sort((a, b) => {
      // Order by y, then x (top-to-bottom, left-to-right)
      const ay = a.bbox?.[1] ?? 0,
        by = b.bbox?.[1] ?? 0;
      const ax = a.bbox?.[0] ?? 0,
        bx = b.bbox?.[0] ?? 0;
      return ay - by || ax - bx;
    });

    for (const block of blocks) {
      md.push(blockToMarkdown(block));
    }
  }

  // Cleanup multiple blank lines
  return (
    md
      .join("")
      .replace(/\n{3,}/g, "\n\n")
      .trim() + "\n"
  );
}
