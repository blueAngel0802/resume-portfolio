import { useEffect, useMemo, useState } from "react";
import { StarsBackground } from "./components/StarsBackground";
import { RainbowCursorTrail } from "./components/RainbowCursorTrail";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import Section from "./components/Section";
import { Proof } from "./components/Proof";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { ExperienceHighlights } from "./components/ExperienceHighlights";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function useIridescence() {
  useEffect(() => {
    const root = document.documentElement;
    const handler = (e: PointerEvent) => {
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
  }, []);
}

export default function App() {  useIridescence();

  return (
    <div className="appWrap">
      <StarsBackground />
      <RainbowCursorTrail />
      <div className="app">
      <div id="top" />
      <Header />

      <main>
        <Hero />
        <div className="container">
          <Proof />
          <Section id="projects" title="Projects / Case Studies" subtitle="Templates you can quickly customize">
            <Projects />
          </Section>
          <Section id="services" title="Services" subtitle="Freelance-friendly packages you can offer">
            <Services />
          </Section>
          <Section id="process" title="Process" subtitle="How I work with teams and clients">
            <Process />
          </Section>
          <Section id="experience" title="Experience (highlights)" subtitle="Job-friendly, short and scannable">
            <ExperienceHighlights />
          </Section>
          <Section id="contact" title="Contact" subtitle="Fastest way to reach me">
            <Contact />
          </Section>
        </div>
      </main>

      <Footer />
          </div>
    </div>
  );
}
