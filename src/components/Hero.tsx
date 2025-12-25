import { portfolio } from "../data/portfolio";

export function Hero() {
  return (
    <section className="hero">
      <div className="container heroGrid">
        <div>
          <p className="pill">Job-ready • Freelance-ready • React/TypeScript</p>
          <h1 className="h1">{portfolio.headline}</h1>
          <p className="lead">{portfolio.subheadline}</p>
          <div className="ctas" style={{ marginTop: 14 }}>
            <a className="btn btnPrimary" href="mailto:ryan.converse0430@outlook.com">Contact</a>
            <a className="btn" href="#projects">See projects</a>
          </div>
        </div>

        <div className="card">
          <h3 className="h3">What you get</h3>
          <p className="muted small" style={{ marginTop: 8 }}>
            Clear communication, measurable improvements, and maintainable code — whether it's a full-time role or a focused freelance
            engagement.
          </p>
          <div className="tags">
            {["Performance", "DX", "Mentorship", "Reliability"].map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}