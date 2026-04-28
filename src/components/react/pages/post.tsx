import { NuqsAdapter } from "nuqs/adapters/react";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import TwBlogLayout from "@/components/react/components/TwBlogLayout";
import { TwBlogNavButton } from "@/components/react/components/TwBlogNav";
import TwBlogTagsDate from "@/components/react/components/TwBlogTagsDate";
import TwLink from "@/components/react/components/TwLink";
import type { PostListItem } from "@/libs/posts";

interface PostProps {
  postData: PostListItem;
  children?: ReactNode;
}

const Post = ({ postData, children }: PostProps) => {
  const { title } = postData;

  return (
    <TwBlogLayout hideBlogNav={true} headerLinkUrl="/blog">
      {/* title, tags, timestamp  */}
      <div className="mt-4 mb-4 flex flex-col gap-4">
        <h1 className="text-center text-3xl font-semibold">{title}</h1>

        <TwBlogTagsDate itemData={postData} />
      </div>

      {/* md content rendered via Astro's <Content /> */}
      <article
        className={twMerge(
          "prose",
          "dark:prose-invert",
          "prose-a:text-sky-500 prose-a:underline prose-a:underline-offset-2",
          "hover:prose-a:text-sky-700",
          "prose-blockquote:border-sky-500 prose-blockquote:bg-sky-100 prose-blockquote:py-0.5 prose-blockquote:not-italic",
          "prose-pre:border-2 prose-pre:border-gray-500 prose-pre:p-0",
          "prose-li:leading-6",
          "prose-img:mx-auto",
          "prose-a:dark:text-sky-400",
          "hover:prose-a:dark:text-sky-200",
          "prose-blockquote:dark:text-gray-800",
        )}
      >
        {children}
      </article>

      {/* bottom navigation */}
      <div className="mt-6 flex justify-between">
        <TwLink href="/blog">blog</TwLink>

        <TwBlogNavButton
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          back to top
        </TwBlogNavButton>
      </div>
    </TwBlogLayout>
  );
};

const PostWrapper = ({ postData, children }: PostProps) => {
  return (
    <NuqsAdapter>
      <Post postData={postData}>{children}</Post>
    </NuqsAdapter>
  );
};

export default PostWrapper;
