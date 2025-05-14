"use client";

import { useEffect, useState } from "react";
import { Theme, Mode } from "@/lib/theme/types";

export function StandaloneThemeToggle() {
  const [theme, setTheme] = useState<Theme>("default");
  const [mode, setMode] = useState<Mode>("system");
  const [mounted, setMounted] = useState(false);

  // Update theme in localStorage and DOM
  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);

    if (newTheme === "default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", newTheme);
    }

    localStorage.setItem("theme", newTheme);
  };

  // Update mode in localStorage and DOM
  const handleSetMode = (newMode: Mode) => {
    setMode(newMode);
    localStorage.setItem("mode", newMode);

    if (newMode === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      document.documentElement.classList.toggle("dark", newMode === "dark");
    }
  };

  // Initialize on component mount
  useEffect(() => {
    setMounted(true);

    // Get stored preferences
    const storedTheme = (localStorage.getItem("theme") as Theme) || "default";
    const storedMode = (localStorage.getItem("mode") as Mode) || "system";

    // Set initial theme
    setTheme(storedTheme);
    if (storedTheme !== "default") {
      document.documentElement.setAttribute("data-theme", storedTheme);
    }

    // Set initial mode
    setMode(storedMode);
    if (storedMode === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDark);
    } else {
      document.documentElement.classList.toggle("dark", storedMode === "dark");
    }

    // Listen for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (storedMode === "system") {
        document.documentElement.classList.toggle("dark", mediaQuery.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-background border border-border rounded-lg">
      {/* Theme Selector */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Theme:</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSetTheme('default')}
            className={`px-3 py-1 rounded-md ${
              theme === 'default'
                ? "bg-primary text-background"
                : "bg-background border border-border"
            }`}
          >
            Default
          </button>
          <button
            onClick={() => handleSetTheme('green')}
            className={`px-3 py-1 rounded-md ${
              theme === 'green'
                ? "bg-primary text-background"
                : "bg-background border border-border"
            }`}
          >
            Green
          </button>
          <button
            onClick={() => handleSetTheme('purple')}
            className={`px-3 py-1 rounded-md ${
              theme === 'purple'
                ? "bg-primary text-background"
                : "bg-background border border-border"
            }`}
          >
            Purple
          </button>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Mode:</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSetMode('light')}
            className={`px-3 py-1 rounded-md ${
              mode === 'light'
                ? "bg-primary text-background"
                : "bg-background border border-border"
            }`}
          >
            Light
          </button>
          <button
            onClick={() => handleSetMode('dark')}
            className={`px-3 py-1 rounded-md ${
              mode === 'dark'
                ? "bg-primary text-background"
                : "bg-background border border-border"
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => handleSetMode('system')}
            className={`px-3 py-1 rounded-md ${
              mode === 'system'
                ? "bg-primary text-background"
                : "bg-background border border-border"
            }`}
          >
            System
          </button>
        </div>
      </div>
    </div>
  );
}
