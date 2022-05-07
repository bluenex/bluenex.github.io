import { useEffect, useState } from "react";
import Svgs from "./svgs";

const TwDarkToggle = () => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode === null) {
      return;
    }

    if (darkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="absolute top-4 right-4">
      <button
        className="hover:scale-110 hover:duration-200"
        onClick={() => setDarkMode((p) => !p)}
      >
        <Svgs.MoonStar className="h-7 w-7 fill-gray-600 dark:hidden" />
        <Svgs.SunDim className="hidden h-7 w-7 fill-gray-50 dark:block" />
      </button>
    </div>
  );
};

export default TwDarkToggle;
