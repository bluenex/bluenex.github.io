import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import TwBlogLayout from "../../components/TwBlogLayout";
import TwBlogListItem from "../../components/TwBlogListItem";
import { getPostList, PostListItem } from "../../lib/posts";

const Post: NextPage = ({
  postList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <TwBlogLayout>
      {/* posts list */}
      <div className="flex flex-col items-start gap-6">
        {postList.map((postItemData: PostListItem) => (
          <TwBlogListItem itemData={postItemData} key={postItemData.date} />
        ))}
      </div>
    </TwBlogLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const postList = getPostList();

  return {
    props: {
      postList,
    },
  };
};

export default Post;
