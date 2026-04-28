import { useEffect, useState } from "react";

export const useWatchDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  // watch for changes by tracking class of <html>
  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const isDark = document.documentElement.classList.contains("dark");
          setIsDarkMode(isDark);
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true, // Watch for changes to attributes
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return isDarkMode;
};
