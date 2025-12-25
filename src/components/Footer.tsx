import { portfolio } from "../data/portfolio";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footerInner">
        <div className="muted small">© {new Date().getFullYear()} {portfolio.name}</div>
        <div className="ctas">
          <a className="btn" href="#projects">Projects</a>
          <a className="btn" href={`mailto:${portfolio.email}`}>Contact</a>
        </div>
      </div>
    </footer>
  );
}