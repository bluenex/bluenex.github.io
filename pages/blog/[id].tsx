import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { getAllPostIds, getPostData, PostData } from "../../lib/posts";

const Post: NextPage = ({
  postData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // const { title, content, builder, builder_info, links, thumbnail } = postData;
  // const reactContent = useMarkdownProcessor(content);

  console.log({ postData });

  return (
    <article
      className="prose prose-li:leading-6"
      dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
    ></article>
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
