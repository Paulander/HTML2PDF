const tiers = [
  {
    name: "Developer",
    price: "$19",
    volume: "1,000 PDFs/month",
    copy: "For solo builders and early automations."
  },
  {
    name: "Business",
    price: "$49",
    volume: "5,000 PDFs/month",
    copy: "For small SaaS apps and client workflows."
  },
  {
    name: "Enterprise",
    price: "$99+",
    volume: "Custom / fair use",
    copy: "For higher volume, compliance needs, and dedicated deployment options."
  }
];

export default function PricingPage() {
  return (
    <main>
      <section className="section">
        <p className="eyebrow">Pricing</p>
        <h1>Usage-based plans for PDF workflows.</h1>
        <p className="lead">
          Start with predictable monthly volume. Stripe checkout is intentionally left as a TODO until live secrets and
          product IDs are configured.
        </p>
      </section>
      <section className="pricing">
        {tiers.map((tier) => (
          <article className="card" key={tier.name}>
            <h2>{tier.name}</h2>
            <div className="price">{tier.price}</div>
            <p>{tier.volume}</p>
            <p>{tier.copy}</p>
            <button className="button secondary" type="button">
              Stripe TODO
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
