# PDFForge Lite

PDFForge Lite is a production-minded MVP for an HTML-to-PDF generation API. Send HTML and CSS to one endpoint and get a PDF back without wiring Chromium, Playwright, deployment dependencies, usage tracking, and API docs from scratch.

## Features

- Next.js dashboard, playground, docs, pricing, and usage pages
- `POST /api/v1/pdf` returning `application/pdf`
- Playwright/Chromium rendering in a single service module
- API key check with local demo fallback
- Prisma + SQLite local usage tracking
- Payload validation, max body size, render timeout, and clear errors
- URL rendering disabled by default with SSRF guard helpers ready
- Dockerfile based on the official Playwright image
- Vitest validation tests and a basic render test

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000` and use the playground.

## Environment

```bash
DATABASE_URL="file:./dev.db"
PDF_API_KEY="dev-secret"
PDF_STORAGE_MODE="direct"
PDF_MAX_PAYLOAD_BYTES="524288"
PDF_RENDER_TIMEOUT_MS="20000"
PDF_ENABLE_URL_RENDERING="false"
API_KEY_SECRET=""
STRIPE_SECRET_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_PRICE_DEVELOPER=""
STRIPE_PRICE_BUSINESS=""
```

If `PDF_API_KEY` is not set, the API accepts local demo requests and logs a warning. Set it before exposing the service.

## API

### Health

```bash
curl http://localhost:3000/api/v1/health
```

### Generate a PDF

```bash
curl -X POST http://localhost:3000/api/v1/pdf \
  -H "content-type: application/json" \
  -H "x-api-key: dev-secret" \
  -d '{"html":"<html><body><h1>Hello PDF</h1></body></html>","format":"A4","printBackground":true}' \
  --output hello.pdf
```

Request body:

```json
{
  "html": "<html>...</html>",
  "css": "body { font-family: Arial; }",
  "url": "https://example.com",
  "format": "A4",
  "landscape": false,
  "margin": {
    "top": "24px",
    "right": "24px",
    "bottom": "24px",
    "left": "24px"
  },
  "printBackground": true
}
```

Provide either `html` or `url`, not both. URL rendering is disabled by default.

## JavaScript example

```ts
const response = await fetch("https://your-app.com/api/v1/pdf", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "x-api-key": process.env.PDF_API_KEY!
  },
  body: JSON.stringify({
    html: "<h1>Invoice</h1>",
    css: "body { font-family: Arial; }",
    printBackground: true
  })
});

if (!response.ok) {
  throw new Error(await response.text());
}

const pdfBytes = Buffer.from(await response.arrayBuffer());
```

## n8n, Make, and Zapier

Use an HTTP request step:

- Method: `POST`
- URL: `https://your-app.com/api/v1/pdf`
- Headers: `content-type: application/json`, `x-api-key: <your key>`
- Body: JSON with an `html` field populated by the workflow
- Response: binary file

## Usage tracking

Each generation attempt records:

- timestamp
- status
- duration
- payload type
- approximate request size
- consumer label
- truncated error message when rendering fails

The dashboard page at `/usage` shows recent records. The app creates the local SQLite usage tables on first read or write, so `npm run db:push` is optional for local development. For the MVP, records are tied to the development key or anonymous demo label. A production account model can replace this without changing the rendering service.

## URL rendering security

URL rendering can expose your infrastructure to SSRF. This MVP keeps it disabled unless `PDF_ENABLE_URL_RENDERING=true`.

When enabled, the code blocks localhost, private IPv4 ranges, local IPv6 ranges, `.local` names, and DNS results resolving to private addresses. Production deployments should still add:

- outbound network policy or proxy allowlists
- tenant quotas and rate limits
- stricter hostname allowlists for no-code users
- request and response size budgets
- isolated render workers for untrusted documents

## Docker

```bash
docker build -t pdfforge-lite .
docker run --rm -p 3000:3000 \
  -e DATABASE_URL="file:./dev.db" \
  -e PDF_API_KEY="dev-secret" \
  pdfforge-lite
```

The image uses the official Playwright base so Chromium system dependencies are present.

## Deployment notes

The best near-term production shape is a containerized service on Google Cloud Run, Fly.io, Railway, AWS ECS, or a Lambda/container target. Test memory, concurrency, and cold starts before promising high-volume serverless behavior.

For persistent production usage tracking, use Postgres by changing the Prisma datasource provider and running a migration. SQLite is intentionally local-first for this MVP.

## Stripe TODO

Pricing pages are present for:

- Developer: $19/month, 1,000 PDFs/month
- Business: $49/month, 5,000 PDFs/month
- Enterprise: $99/month or custom / fair use

Checkout is intentionally a skeleton until `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_PRICE_DEVELOPER`, and `STRIPE_PRICE_BUSINESS` are available. Add customer/account models before enforcing paid quotas.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run db:push
```
