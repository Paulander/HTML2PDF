import { PdfPlayground } from "@/app/playground/PdfPlayground";

export default function PlaygroundPage() {
  return (
    <main>
      <section className="section">
        <p className="eyebrow">Demo playground</p>
        <h1>Render a PDF locally.</h1>
        <p className="lead">
          This playground posts HTML and CSS to the same API your integrations use. Set PDF_API_KEY in production and
          send it with x-api-key from trusted clients or backend workflows.
        </p>
      </section>
      <PdfPlayground />
    </main>
  );
}
