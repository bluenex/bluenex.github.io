import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { TwLink } from "../../components";
import TwBlogLayout from "../../components/TwBlogLayout";
import TwBlogListItem from "../../components/TwBlogListItem";
import { getPostList, PostListItem } from "../../lib/posts";

const Post: NextPage = ({
  postList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <TwBlogLayout>
      {/* nav */}
      <nav className="mb-4 flex justify-center gap-2 text-sm">
        <TwLink href="">tags</TwLink>•<TwLink href="">years</TwLink>•
        <TwLink href="">2022</TwLink>•<TwLink href="">2021</TwLink>•
        <TwLink href="">2020</TwLink>
      </nav>

      {/* posts list */}
      <div className="flex flex-col items-start gap-8">
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
