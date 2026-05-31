import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PDFForge Lite | HTML-to-PDF API for SaaS and no-code workflows",
    template: "%s | PDFForge Lite"
  },
  description:
    "Generate reliable PDFs from HTML and CSS with a developer-friendly API, Playwright rendering, usage tracking, and a local-first containerized MVP.",
  applicationName: "PDFForge Lite",
  keywords: [
    "HTML to PDF API",
    "PDF generation API",
    "Puppeteer alternative",
    "Playwright PDF API",
    "invoice PDF API",
    "n8n PDF generation",
    "Make PDF automation",
    "Zapier PDF generation",
    "serverless PDF rendering"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "PDFForge Lite",
    title: "HTML-to-PDF without babysitting Chromium",
    description:
      "A serverless-friendly HTML-to-PDF API for developers, solopreneurs, no-code builders, and small SaaS apps.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "PDFForge Lite HTML-to-PDF API"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PDFForge Lite",
    description: "Send HTML, get a reliable PDF without managing headless browsers.",
    images: ["/opengraph-image"]
  },
  manifest: "/site.webmanifest",
  category: "developer tools"
};

const navItems = [
  { href: "/playground", label: "Playground" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/marketing", label: "Marketing" },
  { href: "/usage", label: "Usage" }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">
            PDFForge Lite
          </Link>
          <nav>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
