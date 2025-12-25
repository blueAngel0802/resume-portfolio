import { portfolio } from "../data/portfolio";

export function Projects() {
  return (
    <div className="grid2">
      {portfolio.projects.map((p) => (
        <article key={p.title} className="card">
          <div className="muted small">{p.kind}</div>
          <h3 className="h3" style={{ marginTop: 6 }}>{p.title}</h3>
          <p className="muted" style={{ lineHeight: 1.6 }}>{p.oneLiner}</p>

          <div style={{ marginTop: 10 }}>
            <div className="muted small">Problem</div>
            <p style={{ marginTop: 6, lineHeight: 1.6 }}>{p.problem}</p>
          </div>

          <div style={{ marginTop: 10 }}>
            <div className="muted small">Approach</div>
            <ul style={{ marginTop: 6, lineHeight: 1.6, paddingLeft: 18 }}>
              {p.approach.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>

          <div style={{ marginTop: 10 }}>
            <div className="muted small">Outcomes</div>
            <ul style={{ marginTop: 6, lineHeight: 1.6, paddingLeft: 18 }}>
              {p.outcomes.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>

          <div className="tags">
            {p.stack.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>

          <div className="ctas" style={{ marginTop: 12 }}>
            {p.links.map((l) => (
              <a key={l.label} className="btn" href={l.href} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}