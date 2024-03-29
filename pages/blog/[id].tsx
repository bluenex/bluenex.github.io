import hljs from "highlight.js";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import NextLink from "next/link";
import { useEffect } from "react";
import SEO from "../../components/SEO";
import TwBlogLayout from "../../components/TwBlogLayout";
import { TwBlogNavButton } from "../../components/TwBlogNav";
import TwBlogTagsDate from "../../components/TwBlogTagsDate";
import TwLink from "../../components/TwLink";
import { getAllTagsAndYears } from "../../lib/blog";
import { PostData, getAllPostIds, getPostData } from "../../lib/posts";

const Post: NextPage = ({
  postData,
  tags,
  years,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title, excerpt } = postData as PostData;

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  // extract to @apply
  return (
    <TwBlogLayout tags={tags} years={years}>
      {/* SEO for blog details */}
      <SEO title={title} description={excerpt} />

      {/* title, tags, timestamp  */}
      <div className="mb-4 flex flex-col gap-4">
        <h1 className="text-center text-3xl font-semibold">{title}</h1>

        <TwBlogTagsDate itemData={postData} />
      </div>

      {/* md content */}
      <article
        className={`
          prose
          dark:prose-invert prose-a:text-sky-500 prose-a:underline prose-a:underline-offset-2
          hover:prose-a:text-sky-700 prose-blockquote:border-sky-500 prose-blockquote:bg-sky-100 prose-blockquote:py-0.5
          prose-blockquote:not-italic prose-pre:border-2 prose-pre:border-gray-500
          prose-pre:p-0
          prose-li:leading-6
          prose-img:mx-auto
          prose-a:dark:text-sky-400 hover:prose-a:dark:text-sky-200
          prose-blockquote:dark:text-gray-800
        `}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />

      {/* bottom navigation */}
      <div className="mt-6 flex justify-between">
        <NextLink href="/blog">
          <TwLink>blog</TwLink>
        </NextLink>

        <TwBlogNavButton
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          back to top
        </TwBlogNavButton>
      </div>
    </TwBlogLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return { props: {} };
  }

  const { id } = params;
  const postData: PostData = await getPostData(id as string);
  const { tags, years } = getAllTagsAndYears();

  return {
    props: {
      postData,
      tags,
      years,
    },
  };
};

export default Post;
