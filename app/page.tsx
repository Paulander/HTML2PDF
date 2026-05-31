import Link from "next/link";

const pains = [
  "Puppeteer deployment friction",
  "Serverless timeouts",
  "Memory crashes",
  "CSS print issues",
  "No-code PDF generation pain"
];

const useCases = [
  {
    title: "Invoice and receipt PDFs",
    copy: "Turn billing HTML into branded PDFs from your app, webhook, or automation flow."
  },
  {
    title: "Client reports",
    copy: "Generate monthly summaries, audit packets, campaign reports, and onboarding documents."
  },
  {
    title: "No-code documents",
    copy: "Give n8n, Make, and Zapier workflows a simple HTTP endpoint for binary PDF output."
  },
  {
    title: "Internal SaaS exports",
    copy: "Ship PDF export without adding Chromium operations to every product team."
  }
];

const proofPoints = ["Playwright renderer", "Direct PDF response", "Usage tracking", "Docker-ready", "URL mode guarded"];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PDFForge Lite",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: [
      { "@type": "Offer", name: "Developer", price: "19", priceCurrency: "USD" },
      { "@type": "Offer", name: "Business", price: "49", priceCurrency: "USD" }
    ],
    description: "HTML-to-PDF generation API for developers, no-code builders, and small SaaS apps."
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="hero">
        <div>
          <p className="eyebrow">Developer PDF infrastructure</p>
          <h1>HTML-to-PDF without babysitting Chromium.</h1>
          <p className="lead">
            PDFForge Lite turns HTML, CSS, or approved URLs into PDFs through a simple API, with Playwright rendering
            contained behind a service boundary you can run locally or deploy in a container.
          </p>
          <div className="badge-row" aria-label="Product capabilities">
            {proofPoints.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
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

      <section className="metric-strip" aria-label="Positioning summary">
        <div className="metric">
          <strong>Target</strong>
          <span>Small SaaS, agencies, no-code operators</span>
        </div>
        <div className="metric">
          <strong>Primary promise</strong>
          <span>Send HTML, get a PDF</span>
        </div>
        <div className="metric">
          <strong>Best first wedge</strong>
          <span>Invoices, reports, workflow PDFs</span>
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

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Use cases</p>
          <h2>Market the outcome, not the renderer.</h2>
          <p>
            The strongest entry point is not generic PDF generation. It is removing one annoying production task from
            teams that already have HTML and just need dependable documents.
          </p>
        </div>
        <div className="grid two">
          {useCases.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="callout">
        <div>
          <p className="eyebrow">Go-to-market angle</p>
          <h2>Lead with reliability for tiny teams.</h2>
          <p>
            The buyer has already tried wkhtmltopdf, Puppeteer, or a no-code workaround. Use copy that names the pain:
            Chrome dependencies, flaky serverless functions, print CSS surprises, and PDFs that fail at exactly the
            wrong time.
          </p>
        </div>
        <Link className="button" href="/marketing">
          Open marketing plan
        </Link>
      </section>
    </main>
  );
}
