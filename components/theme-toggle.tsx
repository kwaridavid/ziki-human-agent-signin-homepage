"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

export function applyThemeClient(theme: Theme) {
  if (theme === "system") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Private browsing may block local storage; the page theme still changes.
  }
}

export function useTheme(): [Theme, (theme: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>("system");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark" || saved === "system") {
        setThemeState(saved);
        applyThemeClient(saved);
      }
    } catch {
      // Use the operating-system preference when storage is unavailable.
    }
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    applyThemeClient(next);
  };
  return [theme, setTheme];
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useTheme();
  const [systemDark, setSystemDark] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemDark(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const dark = theme === "dark" || (theme === "system" && systemDark);
  const label = dark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      className={`inline-flex size-10 items-center justify-center rounded-full border border-zk-border bg-zk-surface text-lg text-zk-muted hover:text-zk-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue ${className}`}
      type="button"
      aria-label={label}
      title={label}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? "☀" : "☾"}
    </button>
  );
}
