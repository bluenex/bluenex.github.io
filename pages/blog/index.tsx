import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TwBlogLayout from "../../components/TwBlogLayout";
import TwBlogListItem from "../../components/TwBlogListItem";
import { getPostList, PostListItem } from "../../lib/posts";

const Blog: NextPage = ({
  allPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const [filteredPosts, setFilteredPosts] = useState<PostListItem[]>([]);

  useEffect(() => {
    console.log({ router });

    if (router.query.tag) {
      setFilteredPosts(
        allPosts.filter((post: PostListItem) => {
          return post.tags?.includes(router.query.tag as string);
        })
      );
      return;
    }

    if (router.query.year) {
      setFilteredPosts(
        allPosts.filter((post: PostListItem) => {
          return post.year?.includes(router.query.year as string);
        })
      );
      return;
    }

    if (!router.asPath.includes("year") && !router.asPath.includes("tag")) {
      setFilteredPosts(allPosts);
    }
  }, [allPosts, router]);

  return (
    <TwBlogLayout>
      {/* posts list */}
      <div className="flex flex-col items-start gap-6">
        {filteredPosts.map((postItemData: PostListItem) => (
          <TwBlogListItem itemData={postItemData} key={postItemData.date} />
        ))}
      </div>
    </TwBlogLayout>
  );
};

/**
 * @description currently use `getStaticProps` because I want to deplot on
 * GitHub pages. However, this will definitely drag the performance down
 * when there are a lot of posts. `getServerSideProps` is the way to go then.
 */
export const getStaticProps: GetStaticProps = async (context) => {
  const allPosts = getPostList();

  return {
    props: {
      allPosts,
    },
  };
};

export default Blog;
