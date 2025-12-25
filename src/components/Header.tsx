import { portfolio } from "../data/portfolio";
import { smoothScrollToId } from "../lib/scrollTo";

const links = [
  { label: "Projects", id: "projects" },
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export function Header(props: { theme: "light" | "dark"; onToggleTheme: () => void }) {
  return (
    <header className="header">
      <div className="container headerInner">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollToId("top", { offset: 84, duration: 650 });
          }}
        >
          <span className="brandDot" aria-hidden />
          <span>{portfolio.name}</span>
        </a>

        <nav className="nav">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                smoothScrollToId(l.id, { offset: 84, duration: 750 });
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ctas">
          <button className="btn" onClick={props.onToggleTheme} type="button">
            {props.theme === "dark" ? "Light" : "Dark"}
          </button>
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
