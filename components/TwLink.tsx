import {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  LegacyRef,
} from "react";

const TwLink = forwardRef(
  (
    props: DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    > & { isExternal?: boolean | undefined },
    ref: LegacyRef<HTMLAnchorElement> | undefined
  ) => {
    const { isExternal = false, ...restProps } = props;
    const externalProps = isExternal
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};

    return (
      <a
        ref={ref}
        className="text-sky-500 underline underline-offset-2 hover:text-sky-700 dark:text-sky-400 hover:dark:text-sky-200"
        {...externalProps}
        {...restProps}
      />
    );
  }
);

TwLink.displayName = "TwLink";

export default TwLink;
