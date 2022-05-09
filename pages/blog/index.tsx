import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import TwBlogLayout from "../../components/TwBlogLayout";
import TwBlogListItem from "../../components/TwBlogListItem";
import { getPostList, PostListItem } from "../../lib/posts";

const Post: NextPage = ({
  postList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postList = getPostList(context.query);

  return {
    props: {
      postList,
    },
  };
};

export default Post;
