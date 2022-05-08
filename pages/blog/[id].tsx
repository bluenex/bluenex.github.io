import hljs from "highlight.js";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useEffect } from "react";
import TwBlogLayout from "../../components/TwBlogLayout";
import TwBlogTagsDate from "../../components/TwBlogTagsDate";
import { getAllPostIds, getPostData, PostData } from "../../lib/posts";

const Post: NextPage = ({
  postData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { title } = postData as PostData;

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  // extract to @apply
  return (
    <TwBlogLayout>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl">{title}</h1>

        <TwBlogTagsDate itemData={postData} />
      </div>

      <article
        className={`
          prose
          prose-a:text-sky-500 prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-sky-700
          prose-blockquote:border-sky-500 prose-blockquote:bg-sky-100 prose-blockquote:py-0.5
          prose-pre:border-2 prose-pre:border-gray-500 prose-pre:p-0
          prose-li:leading-6
          prose-img:mx-auto
          dark:prose-invert
          prose-a:dark:text-sky-400 hover:prose-a:dark:text-sky-200
          prose-blockquote:dark:text-gray-800
        `}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
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

  return {
    props: {
      postData,
    },
  };
};

export default Post;
