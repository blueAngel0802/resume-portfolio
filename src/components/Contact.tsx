import { portfolio } from "../data/portfolio";
import { contact } from "../data/resume_contact";

export function Contact() {
  return (
    <div className="grid2">
      <div className="card">
        <h3 className="h3">For jobs</h3>
        <p className="muted" style={{ lineHeight: 1.6 }}>
          Recruiters: download the full resume PDF and reach out by email.
        </p>
        <div className="ctas" style={{ marginTop: 10 }}>
          <a className="btn" href="/resume.pdf" download>Download resume</a>
          <a className="btn" href={portfolio.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>

      <div className="card">
        <h3 className="h3">For freelance</h3>
        <p className="muted" style={{ lineHeight: 1.6 }}>
          Clients: tell me your goal, timeline, and current stack. I’ll suggest a fast plan.
        </p>
        <div className="ctas" style={{ marginTop: 10 }}>
          <a className="btn btnPrimary" href={`mailto:${portfolio.email}?subject=Project%20inquiry`}>Email me</a>
          <a className="btn" href={contact.github}>My Github</a>
        </div>
        <div className="muted small" style={{ marginTop: 10 }}>
        </div>
      </div>
    </div>
  );
}