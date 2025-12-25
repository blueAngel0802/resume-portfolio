import React from "react";

export function Section({ id, title, children }:
{ id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{marginBottom:32}}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}