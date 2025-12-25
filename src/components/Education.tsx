import { resume } from "../data/resume";

export function Education() {
  const e = resume.education;
  return (
    <div className="card">
      <div className="cardHeader">
        <div>
          <h3 className="h3">{e.school}</h3>
          <p className="muted">{e.degree}</p>
        </div>
        <div className="dateTag">{e.date}</div>
      </div>
    </div>
  );
}
