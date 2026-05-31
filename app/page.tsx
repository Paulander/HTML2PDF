import Link from "next/link";

const pains = [
  "Puppeteer deployment friction",
  "Serverless timeouts",
  "Memory crashes",
  "CSS print issues",
  "No-code PDF generation pain"
];

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">Developer PDF infrastructure</p>
          <h1>HTML-to-PDF without babysitting Chromium.</h1>
          <p className="lead">
            PDFForge Lite turns HTML, CSS, or approved URLs into PDFs through a simple API, with Playwright rendering
            contained behind a service boundary you can run locally or deploy in a container.
          </p>
          <div className="actions">
            <Link className="button" href="/playground">
              Try the playground
            </Link>
            <Link className="button secondary" href="/docs">
              View API docs
            </Link>
          </div>
        </div>
        <div className="terminal" aria-label="Example API call">
          <pre>{`curl -X POST http://localhost:3000/api/v1/pdf \\
  -H "content-type: application/json" \\
  -H "x-api-key: dev-secret" \\
  -d '{"html":"<h1>Hello PDF</h1>"}' \\
  --output hello.pdf`}</pre>
        </div>
      </section>
      <section className="section">
        <h2>Built for the messy parts developers usually inherit</h2>
        <div className="grid three">
          {pains.map((pain) => (
            <article className="card" key={pain}>
              <h3>{pain}</h3>
              <p>
                Keep rendering logic in one API surface, add observability through usage records, and move the service
                to Cloud Run, Fly.io, Railway, ECS, or a containerized serverless target when traffic grows.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
