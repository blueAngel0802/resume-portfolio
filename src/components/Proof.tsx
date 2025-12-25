import { portfolio } from "../data/portfolio";

export function Proof() {
  return (
    <section className="section" aria-label="Proof">
      <div className="sectionHeader">
        <h2 className="h2">Proof</h2>
        <p className="muted">A few outcomes (edit in src/data/portfolio.ts)</p>
      </div>

      <div className="kpis">
        {portfolio.proof.map((k) => (
          <div key={k.label} className="card kpi">
            <div className="muted small">{k.label}</div>
            <strong>{k.value}</strong>
            {k.note ? <div className="muted small" style={{ marginTop: 6 }}>{k.note}</div> : null}
          </div>
        ))}
      </div>
    </section>
  );
}