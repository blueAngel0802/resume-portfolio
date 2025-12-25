import { resume } from "../data/resume";

export function Header() {
  return (
    <header style={{borderBottom:"1px solid #222",padding:"14px 24px"}}>
      <strong>{resume.name}</strong>
    </header>
  );
}