import { forwardRef, type Ref } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  asExternalLink?: boolean;
  href?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * @description TwLink is a component that wraps around <a> tag.
 * If link style is needed to be a children of NextLink, pass asSpan as true.
 */
const TwLink = forwardRef(
  (props: Props, ref: Ref<HTMLAnchorElement> | undefined) => {
    const { children, className, href, asExternalLink = false } = props;

    return (
      <a
        ref={ref}
        href={href}
        className={twMerge(
          className ||
            "text-sky-500 underline underline-offset-2 hover:text-sky-700 dark:text-sky-400 hover:dark:text-sky-200",
        )}
        {...(asExternalLink && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
      >
        {children}
      </a>
    );
  },
);

TwLink.displayName = "TwLink";

export default TwLink;
