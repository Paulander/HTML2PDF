export default function DocsPage() {
  return (
    <main className="doc-layout">
      <aside className="toc">
        <a href="#endpoint">Endpoint</a>
        <a href="#auth">Authentication</a>
        <a href="#examples">Examples</a>
        <a href="#no-code">No-code tools</a>
        <a href="#deploy">Deployment</a>
        <a href="#security">Security</a>
      </aside>
      <section className="docs-content">
        <div>
          <p className="eyebrow">API documentation</p>
          <h1>Generate PDFs from HTML.</h1>
          <p className="lead">
            POST JSON to the API and receive application/pdf. URL rendering is disabled by default until you explicitly
            enable and review SSRF protections.
          </p>
        </div>

        <article className="card" id="endpoint">
          <h2>Endpoint</h2>
          <pre>{`POST /api/v1/pdf
Content-Type: application/json

{
  "html": "<html><body><h1>Hello</h1></body></html>",
  "css": "body { font-family: Arial; }",
  "format": "A4",
  "landscape": false,
  "margin": { "top": "24px", "right": "24px", "bottom": "24px", "left": "24px" },
  "printBackground": true
}`}</pre>
        </article>

        <article className="card" id="auth">
          <h2>Authentication</h2>
          <p>
            Set PDF_API_KEY to require requests to include x-api-key or Authorization: Bearer. If PDF_API_KEY is absent,
            local demo mode accepts requests and logs a warning.
          </p>
        </article>

        <article className="card" id="examples">
          <h2>Examples</h2>
          <h3>curl</h3>
          <pre>{`curl -X POST http://localhost:3000/api/v1/pdf \\
  -H "content-type: application/json" \\
  -H "x-api-key: dev-secret" \\
  -d '{"html":"<h1>Invoice</h1>","format":"A4"}' \\
  --output invoice.pdf`}</pre>
          <h3>JavaScript fetch</h3>
          <pre>{`const response = await fetch("https://your-app.com/api/v1/pdf", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-api-key": process.env.PDF_API_KEY
  },
  body: JSON.stringify({ html, css, printBackground: true })
});

if (!response.ok) throw new Error(await response.text());
const pdf = await response.arrayBuffer();`}</pre>
          <h3>Node</h3>
          <pre>{`import fs from "node:fs/promises";

const response = await fetch("http://localhost:3000/api/v1/pdf", {
  method: "POST",
  headers: { "content-type": "application/json", "x-api-key": "dev-secret" },
  body: JSON.stringify({ html: "<h1>Report</h1>" })
});

await fs.writeFile("report.pdf", Buffer.from(await response.arrayBuffer()));`}</pre>
        </article>

        <article className="card" id="no-code">
          <h2>n8n, Make, and Zapier</h2>
          <p>
            Use an HTTP request step, set method to POST, content type to JSON, add x-api-key when configured, and map
            generated HTML from your workflow into the html field. Store the binary response in your tool&apos;s file field.
          </p>
        </article>

        <article className="card" id="deploy">
          <h2>Deployment notes</h2>
          <p>
            Playwright and Chromium are easiest to run in a container. The included Dockerfile installs browser
            dependencies and runs the Next.js server. Good next targets are Cloud Run, Fly.io, Railway, AWS ECS, or
            Lambda/container infrastructure after testing cold starts and memory limits.
          </p>
        </article>

        <article className="card" id="security">
          <h2>Security caveats</h2>
          <p>
            URL rendering can fetch attacker-controlled pages. It is disabled by default. When enabled, the MVP blocks
            localhost, private IPs, .local names, and DNS records resolving to private ranges, but production deployments
            should add egress controls, allowlists, request budgets, and tenant-specific limits.
          </p>
        </article>
      </section>
    </main>
  );
}
