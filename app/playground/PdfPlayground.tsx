"use client";

import { useMemo, useState } from "react";
import { templates, type TemplateKey } from "@/lib/templates";

export function PdfPlayground() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateKey>("invoice");
  const currentTemplate = useMemo(
    () => templates.find((template) => template.key === activeTemplate) ?? templates[0],
    [activeTemplate]
  );
  const [html, setHtml] = useState(currentTemplate.html);
  const [css, setCss] = useState(currentTemplate.css);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  function chooseTemplate(key: TemplateKey) {
    const template = templates.find((item) => item.key === key) ?? templates[0];
    setActiveTemplate(template.key);
    setHtml(template.html);
    setCss(template.css);
    setMessage(null);
  }

  async function render() {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/v1/pdf", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ html, css, format: "A4", printBackground: true })
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? `Request failed with ${response.status}`);
      }

      const blob = await response.blob();
      const href = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = href;
      link.download = `${activeTemplate}-pdfforge-lite.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(href);
      setMessage({ kind: "ok", text: "PDF generated and downloaded." });
    } catch (error) {
      setMessage({ kind: "error", text: error instanceof Error ? error.message : "PDF generation failed." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="playground">
      <section className="editor-stack">
        <label>
          HTML
          <textarea value={html} onChange={(event) => setHtml(event.target.value)} spellCheck={false} />
        </label>
        <label>
          CSS
          <textarea className="small" value={css} onChange={(event) => setCss(event.target.value)} spellCheck={false} />
        </label>
        <div>
          <button className="button" onClick={render} disabled={isLoading}>
            {isLoading ? "Rendering..." : "Render PDF"}
          </button>
          {message ? <p className={`status ${message.kind}`}>{message.text}</p> : null}
        </div>
      </section>
      <aside className="card">
        <h2>Templates</h2>
        <p>Start from a realistic document, adjust the markup, then download the generated PDF.</p>
        <div className="template-list">
          {templates.map((template) => (
            <button
              className={`template-button ${template.key === activeTemplate ? "active" : ""}`}
              key={template.key}
              onClick={() => chooseTemplate(template.key)}
            >
              {template.name}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}
