import { resume } from "../data/resume";

export function Experience() {
  return (
    <div>
      {resume.experienceHighlights.map((job) => (
        <div key={job.company} style={{marginBottom:18}}>
          <strong>{job.company}</strong> — {job.role}
          <ul>
            {job.points.map((p,i)=><li key={i}>{p}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}