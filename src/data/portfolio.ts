export type ProofMetric = { label: string; value: string; note?: string };
export type ProjectTemplate = {
  title: string;
  kind: "Job-style" | "Freelance-style";
  oneLiner: string;
  problem: string;
  approach: string[];
  outcomes: string[];
  stack: string[];
  links: { label: string; href: string }[];
};
export type Service = {
  title: string;
  whoItsFor: string;
  includes: string[];
  typicalTimeline: string;
};
export type Step = { title: string; detail: string };

export const portfolio = {
  name: "Ryan David Converse",
  role: "Senior Software Engineer (React/TypeScript)",
  email: "ryan.converse0430@outlook.com",
  linkedin: "https://www.linkedin.com/in/ryan-converse-6978b3394",

  // Job + freelance positioning (short, portfolio-appropriate)
  headline: "I build fast, reliable React applications.",
  subheadline:
    "Senior Software Engineer with 10+ years shipping production UIs. I help teams improve performance, maintainability, and delivery speed — and I take on focused freelance builds and audits.",

  // Proof (recruiters + clients skim this first)
  proof: <ProofMetric[]>[
    {
      label: "App speed",
      value: "+45%",
      note: "React + state management optimization",
    },
    {
      label: "Latency",
      value: "-35%",
      note: "Front-end performance + rendering fixes",
    },
    {
      label: "Build time",
      value: "-30%",
      note: "Tooling improvements (Vite/Webpack)",
    },
    {
      label: "Mentorship",
      value: "Team impact",
      note: "Coaching + code review standards",
    },
  ],

  // Project templates (write as case studies; you can swap titles/links)
  projects: <ProjectTemplate[]>[
    {
      title: "Performance Audit & Optimization Template",
      kind: "Freelance-style",
      oneLiner:
        "Turn a slow React app into a fast, smooth UX with measurable wins.",
      problem:
        "Users experienced sluggish interactions and inconsistent performance across pages.",
      approach: [
        "Profile key flows (React Profiler, Lighthouse, performance marks)",
        "Fix rendering hotspots (memoization, list virtualization, state slicing)",
        "Reduce bundle size (code splitting, dependency trimming)",
        "Add guardrails (budgets + CI checks)",
      ],
      outcomes: [
        "Improved core interaction speed (target: 20–45%)",
        "Reduced long tasks + layout thrash",
        "Documented playbook + follow-up checklist",
      ],
      stack: [
        "React",
        "TypeScript",
        "Redux/State",
        "Lighthouse",
        "Vite/Webpack",
      ],
      links: [
        { label: "Before/After report", href: "#" },
        { label: "Sample PR", href: "#" },
      ],
    },
    {
      title: "Reusable Component System Template",
      kind: "Job-style",
      oneLiner:
        "Build a consistent UI library to speed up feature delivery and reduce bugs.",
      problem:
        "Inconsistent UI patterns slowed delivery and increased regressions.",
      approach: [
        "Audit existing components and consolidate patterns",
        "Create accessible primitives (buttons, inputs, modals)",
        "Define guidelines + examples and add Storybook (optional)",
        "Add tests for key components",
      ],
      outcomes: [
        "Faster feature delivery via reusable components",
        "Fewer UI regressions and better accessibility",
        "Improved developer experience and onboarding",
      ],
      stack: [
        "React",
        "TypeScript",
        "Material UI (or custom)",
        "Testing Library/Jest",
      ],
      links: [{ label: "Component docs", href: "#" }],
    },
  ],

  // Freelance packages (replace pricing if you want)
  services: <Service[]>[
    {
      title: "React Performance Audit (1–2 weeks)",
      whoItsFor: "Teams with a slow app or metrics slipping.",
      includes: [
        "Profiling + findings report",
        "Top fixes implemented (PRs)",
        "Bundle + rendering optimization plan",
        "Hand-off checklist",
      ],
      typicalTimeline: "5–10 business days",
    },
    {
      title: "Feature Delivery Sprint (2–4 weeks)",
      whoItsFor: "Startups needing fast, high-quality front-end shipping.",
      includes: [
        "Implement 1–2 key features end-to-end",
        "API integration + error states",
        "Testing for critical flows",
        "Performance pass and polish",
      ],
      typicalTimeline: "2–4 weeks",
    },
    {
      title: "Frontend Architecture & Refactor (2–6 weeks)",
      whoItsFor: "Apps that grew fast and need structure.",
      includes: [
        "State management + folder structure cleanup",
        "Component boundaries + shared utilities",
        "Build tooling improvements",
        "Documentation for maintainability",
      ],
      typicalTimeline: "2–6 weeks",
    },
  ],

  process: <Step[]>[
    {
      title: "1) Discovery",
      detail: "Clarify goals, constraints, and success metrics.",
    },
    {
      title: "2) Plan",
      detail: "Propose milestones, scope, and technical approach.",
    },
    {
      title: "3) Build",
      detail: "Ship in small PRs with clear communication.",
    },
    {
      title: "4) QA & Polish",
      detail: "Test critical flows, performance check, edge cases.",
    },
    {
      title: "5) Launch",
      detail: "Deploy + hand-off docs + next-step recommendations.",
    },
  ],

  // Experience: SHORT. Resume is a download.
  experienceHighlights: [
    {
      company: "RVO Health",
      role: "Senior Software Engineer",
      dates: "2021–2025",
      bullets: [
        "Improved app speed by ~45% via React + state optimizations.",
        "Reduced latency ~35% and helped raise code quality through mentoring.",
      ],
    },
    {
      company: "Brandbassador",
      role: "Senior Full Stack Engineer",
      dates: "2017–2020",
      bullets: [
        "Built and maintained React features and API integrations.",
        "Improved build efficiency (target ~30%) through tooling work.",
      ],
    },
    {
      company: "Kryptos",
      role: "Software Engineer",
      dates: "2012–2016",
      bullets: [
        "Shipped React/TypeScript UI features with responsive design.",
        "Partnered with designers to translate UX into production UI.",
      ],
    },
  ],
};
