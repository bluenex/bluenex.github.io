import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

const TwLink = (
  props: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) => {
  return (
    <a
      className="text-sky-500 underline underline-offset-2 hover:text-sky-700 dark:text-sky-400 hover:dark:text-sky-200"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
};

export default TwLink;
