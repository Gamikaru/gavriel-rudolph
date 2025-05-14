/* src/lib/theme/ThemeProvider.tsx */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme, Mode } from "./types";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
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
  if (!mounted) return <>{children}</>;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: handleSetTheme,
        mode,
        setMode: handleSetMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
