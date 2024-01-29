import { forwardRef, Ref } from "react";
import { twMerge } from "tailwind-merge";

type AsExternalLink = {
  asExternalLink?: true;
  href?: string;
  className?: string;
  children: React.ReactNode;
};
type AsInternal = {
  asExternalLink?: false;
  href?: never;
  className?: string;
  children: React.ReactNode;
};

type Props = AsExternalLink | AsInternal;

/**
 * @description TwLink is a component that wraps around <a> tag.
 * If link style is needed to be a children of NextLink, pass asSpan as true.
 */
const TwLink = forwardRef(
  (props: Props, ref: Ref<HTMLAnchorElement> | undefined) => {
    const { children, className, href, asExternalLink = false } = props;

    if (asExternalLink) {
      return (
        <a
          ref={ref}
          href={href}
          className={twMerge(
            !className &&
              "text-sky-500 underline underline-offset-2 hover:text-sky-700 dark:text-sky-400 hover:dark:text-sky-200",
            className && className,
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <span
        ref={ref}
        className={twMerge(
          !className &&
            "text-sky-500 underline underline-offset-2 hover:text-sky-700 dark:text-sky-400 hover:dark:text-sky-200",
          className && className,
        )}
      >
        {children}
      </span>
    );
  },
);

TwLink.displayName = "TwLink";

export default TwLink;
