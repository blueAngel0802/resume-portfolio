import React from "react";

export function Section(props: { id?: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={props.id} className="section">
      <div className="sectionHeader">
        <h2 className="h2">{props.title}</h2>
        {props.subtitle ? <p className="muted">{props.subtitle}</p> : null}
      </div>
      <div>{props.children}</div>
    </section>
  );
}