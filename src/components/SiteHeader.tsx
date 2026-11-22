"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function applyTheme(theme: string | null) {
  if (theme === "light" || theme === "dark") document.documentElement.dataset.theme = theme;
  else delete document.documentElement.dataset.theme;
}

export function SiteHeader() {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const saved = localStorage.getItem("frm-theme");
    applyTheme(saved);
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  function toggleTheme() {
    const current = document.documentElement.dataset.theme;
    const next = current === "dark" ? "light" : current === "light" ? "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark";
    localStorage.setItem("frm-theme", next);
    applyTheme(next);
    setTheme(next);
  }

  return (
    <header className="header">
      <div className="header-in">
        <Link className="brand" href="/">FRM Practice</Link>
        <span className="spacer" />
        <Link className="navlink" href="/progress">Progress</Link>
        <button className="iconbtn" type="button" onClick={toggleTheme} aria-label={`Theme ${theme}. Switch theme.`}>
          {theme === "light" ? "Light" : theme === "dark" ? "Dark" : "Theme"}
        </button>
      </div>
    </header>
  );
}
