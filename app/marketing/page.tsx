import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketing Plan",
  description: "Go-to-market strategy, positioning, SEO themes, and launch assets for PDFForge Lite."
};

const channels = [
  {
    name: "SEO landing pages",
    focus: "HTML-to-PDF API, Puppeteer alternative, invoice PDF API, n8n PDF generation",
    action: "Publish one practical page per use case with examples, curl snippets, deployment notes, and failure-mode copy."
  },
  {
    name: "Developer communities",
    focus: "Indie Hackers, Reddit SaaS/dev communities, Hacker News launch, X/LinkedIn build-in-public",
    action: "Share the exact operational pain: keeping Chromium alive in serverless, memory spikes, and CSS print surprises."
  },
  {
    name: "No-code ecosystem",
    focus: "n8n, Make, Zapier, Airtable, Bubble, Webflow operators",
    action: "Create workflow recipes: form submission to branded PDF, invoice to email attachment, client report packet."
  },
  {
    name: "Integration-led outreach",
    focus: "Small SaaS teams with PDF export, agencies shipping client portals, invoice/report products",
    action: "Offer to replace their fragile renderer with a hosted endpoint and one migration example."
  }
];

const launchSequence = [
  "Week 1: Ship demo, docs, pricing, and three real templates. Record a 60-second walkthrough.",
  "Week 2: Publish SEO pages for invoice PDFs, client reports, and n8n PDF generation. Add examples to docs.",
  "Week 3: Do founder-led outreach to 50 small SaaS or agency operators with an existing PDF workflow.",
  "Week 4: Launch on Product Hunt or Hacker News only after three external users have generated PDFs successfully."
];

const copyBlocks = [
  {
    label: "One-liner",
    text: "PDFForge Lite is an HTML-to-PDF API for teams that do not want to operate Chromium."
  },
  {
    label: "Developer CTA",
    text: "Send HTML. Get a PDF. Keep Playwright, browser dependencies, and usage tracking behind one endpoint."
  },
  {
    label: "No-code CTA",
    text: "Turn workflow HTML into downloadable PDFs from n8n, Make, Zapier, or any HTTP request step."
  },
  {
    label: "Objection answer",
    text: "This is not magic infinite serverless scale. It is a reliable container-first MVP you can deploy, observe, and harden."
  }
];

export default function MarketingPage() {
  return (
    <main>
      <section className="section">
        <p className="eyebrow">Marketing strategy</p>
        <h1>Sell the relief: reliable PDFs without Chromium chores.</h1>
        <p className="lead">
          PDFForge Lite should enter the market as a narrow infrastructure utility for small teams that already know PDF
          generation is painful. The first wedge is invoices, client reports, and no-code workflow PDFs.
        </p>
      </section>

      <section className="callout">
        <div>
          <p className="eyebrow">Positioning</p>
          <h2>The ICP is not every developer.</h2>
          <p>
            Start with solopreneurs, agencies, and small SaaS teams that cannot justify maintaining a rendering service
            but still need professional PDFs. They buy speed, fewer deployment surprises, and fewer support tickets.
          </p>
        </div>
        <div className="price">$19</div>
      </section>

      <section className="section marketing-plan">
        <div className="section-heading">
          <p className="eyebrow">Channels</p>
          <h2>Where to find the first users</h2>
        </div>
        <div className="grid two">
          {channels.map((channel) => (
            <article className="card" key={channel.name}>
              <h3>{channel.name}</h3>
              <p><strong>Focus:</strong> {channel.focus}</p>
              <p>{channel.action}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Launch sequence</p>
          <h2>First 30 days</h2>
        </div>
        <ol className="timeline">
          {launchSequence.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Copy assets</p>
          <h2>Reusable messaging</h2>
        </div>
        <div className="grid two">
          {copyBlocks.map((block) => (
            <article className="card" key={block.label}>
              <h3>{block.label}</h3>
              <p>{block.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
