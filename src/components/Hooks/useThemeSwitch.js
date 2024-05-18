"use client";

import { useEffect, useState } from "react";

export function useThemeSwitch() {
  const preferDarkQuery = "(prefers-color-scheme: dark)";
  const storageKey = "theme";

  const toggleTheme = (theme) => {
    if (typeof window !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      window.localStorage.setItem(storageKey, theme);
    }
  };

  const getUserPreference = () => {
    if (typeof window !== "undefined") {
      const userPref = window.localStorage.getItem(storageKey);
      if (userPref) {
        return userPref;
      }
      return window.matchMedia(preferDarkQuery).matches ? "dark" : "light";
    }
    return "dark"; // Default value if `window` is not defined
  };

  const [mode, setMode] = useState(getUserPreference());

  useEffect(() => {
    setMode(getUserPreference());
  }, []);

  useEffect(() => {
    toggleTheme(mode);
  }, [mode]);

  return [mode, setMode];
}
