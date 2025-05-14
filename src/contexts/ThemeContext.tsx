/* src/lib/theme/ThemeProvider.tsx */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react';

// Available theme options
export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeAccent = 'green' | 'blue' | 'cyber';

interface ThemeContextType {
  themeMode: ThemeMode;
  themeAccent: ThemeAccent;
  setThemeMode: (mode: ThemeMode) => void;
  setThemeAccent: (accent: ThemeAccent) => void;
  isDarkMode: boolean;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'system',
  themeAccent: 'green',
  setThemeMode: () => null,
  setThemeAccent: () => null,
  isDarkMode: false,
});

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
  defaultThemeMode?: ThemeMode;
  defaultThemeAccent?: ThemeAccent;
}

export function ThemeProvider({
  children,
  defaultThemeMode = 'system',
  defaultThemeAccent = 'green',
}: ThemeProviderProps) {
  // Initialize state from localStorage, falling back to defaults
  const [themeMode, setThemeModeState] = useState<ThemeMode>(defaultThemeMode);
  const [themeAccent, setThemeAccentState] = useState<ThemeAccent>(defaultThemeAccent);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effect for initializing theme from localStorage
  useEffect(() => {
    // Load saved preferences
    const savedThemeMode = localStorage.getItem('theme-mode') as ThemeMode | null;
    const savedThemeAccent = localStorage.getItem('theme-accent') as ThemeAccent | null;

    if (savedThemeMode) setThemeModeState(savedThemeMode);
    if (savedThemeAccent) setThemeAccentState(savedThemeAccent);

    // Add class to prevent flash during hydration
    document.documentElement.classList.add('theme-initialized');

    // Clean up
    return () => {
      document.documentElement.classList.remove('theme-initialized');
    };
  }, []);

  // Effect for handling system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Handler for system preference change
    const handleChange = () => {
      if (themeMode === 'system') {
        setIsDarkMode(mediaQuery.matches);
      }
    };

    // Initial check
    if (themeMode === 'system') {
      setIsDarkMode(mediaQuery.matches);
    } else {
      setIsDarkMode(themeMode === 'dark');
    }

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    // Clean up
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  // Effect for applying theme classes to the DOM
  useEffect(() => {
    // Apply dark/light class
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }

    // Apply accent theme class
    document.documentElement.classList.remove('theme-green', 'theme-blue', 'theme-cyber');
    if (themeAccent !== 'green') {
      document.documentElement.classList.add(`theme-${themeAccent}`);
    }

    // Update color-scheme meta tag
    document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode, themeAccent]);

  // Theme setters with localStorage persistence
  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('theme-mode', mode);
  };

  const setThemeAccent = (accent: ThemeAccent) => {
    setThemeAccentState(accent);
    localStorage.setItem('theme-accent', accent);
  };

  // Context value
  const value = {
    themeMode,
    themeAccent,
    setThemeMode,
    setThemeAccent,
    isDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using the theme context
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}