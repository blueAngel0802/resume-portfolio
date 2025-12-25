import { resume } from "../data/resume";

export function Hero() {
  return (
    <section style={{padding:"32px 24px"}}>
      <h1>{resume.role}</h1>
      <p style={{color:"#a6acb8"}}>
        Building high-performance web applications for teams and clients.
      </p>
    </section>
  );
}