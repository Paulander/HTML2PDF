export type TemplateKey = "invoice" | "fitness" | "realEstate" | "report";

export type Template = {
  key: TemplateKey;
  name: string;
  html: string;
  css: string;
};

const baseCss = `
  body { font-family: Arial, sans-serif; color: #162033; margin: 0; }
  .page { padding: 36px; }
  h1 { font-size: 34px; margin: 0 0 8px; }
  h2 { font-size: 18px; margin: 28px 0 12px; }
  p { line-height: 1.5; }
  table { width: 100%; border-collapse: collapse; margin-top: 24px; }
  th, td { border-bottom: 1px solid #d8dee8; padding: 12px; text-align: left; }
  th { background: #f2f6fb; }
  .muted { color: #657186; }
  .total { font-size: 22px; font-weight: 700; text-align: right; margin-top: 24px; }
`;

export const templates: Template[] = [
  {
    key: "invoice",
    name: "Invoice",
    html: `<main class="page"><h1>Invoice #1042</h1><p class="muted">PDFForge Lite demo invoice</p><table><thead><tr><th>Item</th><th>Qty</th><th>Amount</th></tr></thead><tbody><tr><td>Product strategy sprint</td><td>1</td><td>$1,200</td></tr><tr><td>Implementation support</td><td>8h</td><td>$960</td></tr></tbody></table><p class="total">Total due: $2,160</p></main>`,
    css: baseCss
  },
  {
    key: "fitness",
    name: "Fitness plan",
    html: `<main class="page"><h1>4 Week Strength Plan</h1><p class="muted">Prepared for Jordan</p><h2>Week 1 Focus</h2><p>Build consistency with three full-body sessions and two mobility days.</p><table><tbody><tr><td>Monday</td><td>Squat, row, plank circuit</td></tr><tr><td>Wednesday</td><td>Deadlift, press, carry</td></tr><tr><td>Friday</td><td>Lunges, pull-down, core finisher</td></tr></tbody></table></main>`,
    css: baseCss
  },
  {
    key: "realEstate",
    name: "Real estate brochure",
    html: `<main class="page"><h1>42 Harbor View</h1><p class="muted">Three bedroom coastal townhouse</p><h2>$725,000</h2><p>Open living, renovated kitchen, private terrace, and a ten-minute walk to the marina.</p><table><tbody><tr><td>Beds</td><td>3</td></tr><tr><td>Baths</td><td>2.5</td></tr><tr><td>Area</td><td>1,940 sq ft</td></tr></tbody></table></main>`,
    css: baseCss
  },
  {
    key: "report",
    name: "Client report",
    html: `<main class="page"><h1>Monthly Growth Report</h1><p class="muted">Acme Studio, May 2026</p><h2>Highlights</h2><p>Qualified leads increased 18%, trial activation improved 9%, and churn risk fell after onboarding updates.</p><table><thead><tr><th>Metric</th><th>Result</th></tr></thead><tbody><tr><td>New MRR</td><td>$14,800</td></tr><tr><td>Activation</td><td>41%</td></tr><tr><td>Expansion pipeline</td><td>$52,000</td></tr></tbody></table></main>`,
    css: baseCss
  }
];
