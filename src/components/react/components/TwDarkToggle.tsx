import { type DetailedHTMLProps, type HTMLAttributes } from "react";
// import { ThemeContext } from "../contexts/theme";
import Svgs from "../svgs";

const TwDarkToggle = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) => {
  // TODO: implement theme toggle
  // const { toggleDarkMode } = useContext(ThemeContext);
  const { className = "" } = props;

  return (
    <div className={className}>
      <button
        type="button"
        className="hover:scale-110 hover:duration-200"
        // onClick={() => toggleDarkMode()}
      >
        <Svgs.MoonStar className="h-7 w-7 fill-gray-600 dark:hidden" />
        <Svgs.SunDim className="hidden h-7 w-7 fill-gray-50 dark:block" />
      </button>
    </div>
  );
};

export default TwDarkToggle;
