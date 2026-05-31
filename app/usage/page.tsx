import { recentGenerations } from "@/lib/usage";

export const dynamic = "force-dynamic";

export default async function UsagePage() {
  const generations = await recentGenerations();

  return (
    <main>
      <section className="section">
        <p className="eyebrow">Usage</p>
        <h1>Recent generations.</h1>
        <p className="lead">
          Local MVP tracking records status, duration, payload type, and approximate request size for recent generation
          attempts.
        </p>
      </section>
      <section className="section">
        <table className="table">
          <thead>
            <tr>
              <th>Created</th>
              <th>Status</th>
              <th>Duration</th>
              <th>Type</th>
              <th>Size</th>
              <th>Consumer</th>
            </tr>
          </thead>
          <tbody>
            {generations.length === 0 ? (
              <tr>
                <td colSpan={6}>No generations recorded yet.</td>
              </tr>
            ) : (
              generations.map((item) => (
                <tr key={item.id}>
                  <td>{item.createdAt.toLocaleString()}</td>
                  <td>{item.status}</td>
                  <td>{item.durationMs}ms</td>
                  <td>{item.payloadType}</td>
                  <td>{item.approximateBytes} bytes</td>
                  <td>{item.consumer?.label ?? "unknown"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
