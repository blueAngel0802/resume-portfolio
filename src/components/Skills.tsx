import { resume } from "../data/resume";

export function Skills() {
  const s = resume.skills;
  return (
    <ul>
      <li><strong>Frontend:</strong> {s.frontend.join(", ")}</li>
      <li><strong>Backend:</strong> {s.backend.join(", ")}</li>
      <li><strong>Cloud:</strong> {s.cloud.join(", ")}</li>
      <li><strong>Testing:</strong> {s.testing.join(", ")}</li>
    </ul>
  );
}