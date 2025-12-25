import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import Section  from "./components/Section";
import { Proof } from "./components/Proof";
import { Projects } from "./components/Projects";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { ExperienceHighlights } from "./components/ExperienceHighlights";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function useTheme() {
  const initial = useMemo(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) return saved;
    const prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
  }, []);

  const [theme, setTheme] = useState<"light" | "dark">(initial);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}

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

export default function App() {
  const { theme, setTheme } = useTheme();
  useIridescence();

  return (
    <div className="app">
      <Header
        theme={theme}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
      />

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
  );
}
