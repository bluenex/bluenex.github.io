import type { ComponentProps } from "react";
import TwAvatar from "./TwAvatar";
import TwBlogNav from "./TwBlogNav";
import TwFooter from "./TwFooter";
import TwLayout from "./TwLayout";
import TwLink from "./TwLink";

const TwBlogLayout = (
  props: ComponentProps<"div"> & { tags: string[]; years: string[] },
) => {
  const { tags, years, children, ...restProps } = props;

  return (
    <TwLayout {...restProps}>
      <div className="flex min-h-screen flex-col justify-between gap-20">
        <div className="container mx-auto flex flex-col gap-6 px-6 pt-6 md:max-w-2xl md:px-0">
          {/* header bar */}
          <div className="relative flex items-center justify-between">
            <TwLink
              href="/"
              className="flex items-center justify-center gap-4 hover:scale-105 hover:transition-transform hover:duration-300"
            >
              <TwAvatar className="h-12 w-12" />
              <span className="text-xl">bluenex</span>
            </TwLink>
          </div>

          {/* blog nav */}
          <TwBlogNav tags={tags} years={years} />

          {/* blog content */}
          {children}
        </div>

        {/* footer */}
        <div className="bg-gray-200 py-5 dark:bg-gray-700">
          <TwFooter />
        </div>
      </div>
    </TwLayout>
  );
};

export default TwBlogLayout;
