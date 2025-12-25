import { portfolio } from "../data/portfolio";

export function Services() {
  return (
    <div className="grid3">
      {portfolio.services.map((s) => (
        <article key={s.title} className="card">
          <h3 className="h3">{s.title}</h3>
          <p className="muted" style={{ lineHeight: 1.6, marginTop: 6 }}>{s.whoItsFor}</p>
          <div style={{ marginTop: 10 }} className="muted small">Includes</div>
          <ul style={{ marginTop: 8, lineHeight: 1.6, paddingLeft: 18 }}>
            {s.includes.map((x) => <li key={x}>{x}</li>)}
          </ul>
          <div className="muted small" style={{ marginTop: 10 }}>Typical timeline: {s.typicalTimeline}</div>
        </article>
      ))}
    </div>
  );
}