import { resume } from "../data/resume";

export function Footer() {
  return (
    <footer style={{borderTop:"1px solid #222",padding:"18px 24px",color:"#a6acb8"}}>
      © {new Date().getFullYear()} {resume.name} · <a href={resume.linkedin}>LinkedIn</a>
    </footer>
  );
}