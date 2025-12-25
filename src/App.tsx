import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Footer } from "./components/Footer";
import { resume } from "./data/resume";

export default function App() {
  return (
    <>
      <Header />
      <Hero />

      <main className="container">
        <Section id="about" title="About">
          <p>{resume.summaryShort}</p>
        </Section>

        <Section id="experience" title="Experience Highlights">
          <Experience />
        </Section>

        <Section id="skills" title="Skills">
          <Skills />
        </Section>

        <Section id="contact" title="Contact">
          <p>Email: <a href={`mailto:${resume.email}`}>{resume.email}</a></p>
          <p><a href="/resume.pdf" download>Download full resume (PDF)</a></p>
        </Section>
      </main>

      <Footer />
    </>
  );
}