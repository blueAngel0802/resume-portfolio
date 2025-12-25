import { portfolio } from "../data/portfolio";

export function ExperienceHighlights() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {portfolio.experienceHighlights.map((job) => (
        <article key={job.company} className="card">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <h3 className="h3">{job.company}</h3>
              <div className="muted small">{job.role}</div>
            </div>
            <div className="muted small">{job.dates}</div>
          </div>
          <ul style={{ marginTop: 10, lineHeight: 1.6, paddingLeft: 18 }}>
            {job.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </article>
      ))}
      <div className="muted small">
        Full details are in the downloadable resume (PDF).
      </div>
    </div>
  );
}