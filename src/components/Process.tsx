import { portfolio } from "../data/portfolio";

export function Process() {
  return (
    <div className="grid2">
      {portfolio.process.map((s) => (
        <article key={s.title} className="card">
          <h3 className="h3">{s.title}</h3>
          <p className="muted" style={{ lineHeight: 1.6, marginTop: 6 }}>{s.detail}</p>
        </article>
      ))}
    </div>
  );
}