import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const saved = localStorage.getItem("theme") as "light" | "dark" | null;
const prefersLight =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches;

const theme = saved ?? (prefersLight ? "light" : "dark");
document.documentElement.setAttribute("data-theme", theme);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
