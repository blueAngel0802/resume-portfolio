import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Footer } from "./components/Footer";
import { resume } from "./data/resume";

export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <div className="container">
        <Section id="summary" title="Summary">
          <p>{resume.summary}</p>
        </Section>
        <Section id="experience" title="Experience">
          <Experience />
        </Section>
        <Section id="skills" title="Skills">
          <Skills />
        </Section>
        <Section id="education" title="Education">
          <Education />
        </Section>
        <Section id="contact" title="Contact">
          <p>{resume.email}</p>
        </Section>
      </div>
      <Footer />
    </>
  );
}