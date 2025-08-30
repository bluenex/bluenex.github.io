import TwBlogLayout from "@/components/react/components/TwBlogLayout";
import { TwBlogNavButton } from "@/components/react/components/TwBlogNav";
import TwBlogTagsDate from "@/components/react/components/TwBlogTagsDate";
import TwLink from "@/components/react/components/TwLink";
import type { PostData } from "@/libs/posts";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark-dimmed.css";
import { NuqsAdapter } from "nuqs/adapters/react";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface PostProps {
  postData: PostData;
  tags: string[];
  years: string[];
}

const Post = ({ postData, tags, years }: PostProps) => {
  const { title } = postData;

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  // extract to @apply
  return (
    <TwBlogLayout tags={tags} years={years}>
      {/* title, tags, timestamp  */}
      <div className="mb-4 flex flex-col gap-4">
        <h1 className="text-center text-3xl font-semibold">{title}</h1>

        <TwBlogTagsDate itemData={postData} />
      </div>

      {/* md content */}
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
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />

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

const PostWrapper = ({ postData, tags, years }: PostProps) => {
  return (
    <NuqsAdapter>
      <Post postData={postData} tags={tags} years={years} />
    </NuqsAdapter>
  );
};

export default PostWrapper;
