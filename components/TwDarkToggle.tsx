import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import Svgs from "./svgs";

const TwDarkToggle = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);
  const { className = "" } = props;

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
    <div className={className}>
      <button
        type="button"
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
