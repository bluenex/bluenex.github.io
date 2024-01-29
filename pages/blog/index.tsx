import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SEO from "../../components/SEO";
import TwBlogLayout from "../../components/TwBlogLayout";
import TwBlogListItem from "../../components/TwBlogListItem";
import { getAllTagsAndYears } from "../../lib/blog";
import { PostListItem, getPostList } from "../../lib/posts";

const Blog: NextPage = ({
  allPosts,
  tags,
  years,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const [filteredPosts, setFilteredPosts] = useState<PostListItem[]>([]);

  useEffect(() => {
    if (router.query.tag) {
      setFilteredPosts(
        allPosts.filter((post: PostListItem) => {
          return post.tags?.includes(router.query.tag as string);
        }),
      );
      return;
    }

    if (router.query.year) {
      setFilteredPosts(
        allPosts.filter((post: PostListItem) => {
          return post.year?.includes(router.query.year as string);
        }),
      );
      return;
    }

    if (!router.asPath.includes("year") && !router.asPath.includes("tag")) {
      setFilteredPosts(allPosts);
    }
  }, [allPosts, router]);

  return (
    <TwBlogLayout tags={tags} years={years}>
      {/* SEO for blog page */}
      <SEO
        title="bluenex's blog"
        description="A personal blog of a random software developer."
      />

      {/* posts list */}
      <div className="flex flex-col items-start gap-6">
        {filteredPosts.map((postItemData: PostListItem) => (
          <TwBlogListItem itemData={postItemData} key={postItemData.date} />
        ))}
      </div>
    </TwBlogLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const allPosts = getPostList();
  const { tags, years } = getAllTagsAndYears();

  return {
    props: {
      allPosts,
      tags,
      years,
    },
  };
};

export default Blog;
