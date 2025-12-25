import { portfolio } from "../data/portfolio";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];

export function Header() {
  return (
    <header className="header">
      <div className="container headerInner">
        <a className="brand" href="#">
          <span className="brandDot" aria-hidden />
          <span>{portfolio.name}</span>
        </a>

        <nav className="nav">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ctas">
          <a className="btn" href="/resume.pdf" download>
            Download resume
          </a>
          <a className="btn btnPrimary" href={`mailto:${portfolio.email}`}>
            Hire me
          </a>
        </div>
      </div>
    </header>
  );
}