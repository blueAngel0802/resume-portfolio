import { portfolio } from "../data/portfolio";
import { smoothScrollToId } from "../lib/scrollTo";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footerInner">
        <div className="muted small">© {new Date().getFullYear()} {portfolio.name}</div>
        <div className="ctas">
          <a className="btn" href="#projects" onClick={(e)=>{
            e.preventDefault()
            smoothScrollToId("projects", { offset: 84, duration: 780 })
            }}>Projects</a>
          <a className="btn" href={`mailto:${portfolio.email}`}>Contact Me</a>
        </div>
      </div>
    </footer>
  );
}