import { useEffect, useState } from "react";
import type { PostListItem } from "../../../libs/posts";
import TwBlogLayout from "../components/TwBlogLayout";
import TwBlogListItem from "../components/TwBlogListItem";
import { useQueryState } from "nuqs";
import { NuqsAdapter } from "nuqs/adapters/react";

interface BlogProps {
  allPosts: PostListItem[];
  tags: string[];
  years: string[];
}

const Blog = ({ allPosts, tags, years }: BlogProps) => {
  const [filteredPosts, setFilteredPosts] = useState<PostListItem[]>([]);
  const [queryTag] = useQueryState("tag");
  const [queryYear] = useQueryState("year");

  useEffect(() => {
    if (!queryTag && !queryYear) {
      setFilteredPosts(allPosts);
    }

    if (queryTag && queryYear) {
      setFilteredPosts(
        allPosts.filter((post) => {
          return (
            post.tags?.includes(queryTag) && post.year?.includes(queryYear)
          );
        }),
      );
      return;
    }

    if (queryTag) {
      setFilteredPosts(
        allPosts.filter((post) => {
          return post.tags?.includes(queryTag);
        }),
      );
      return;
    }

    if (queryYear) {
      setFilteredPosts(
        allPosts.filter((post) => {
          return post.year?.includes(queryYear);
        }),
      );
      return;
    }
  }, [queryTag, queryYear, allPosts]);

  return (
    <TwBlogLayout tags={tags} years={years}>
      {/* posts list */}
      <div className="flex flex-col items-start gap-6">
        {filteredPosts.map((postItemData: PostListItem) => (
          <TwBlogListItem itemData={postItemData} key={postItemData.date} />
        ))}
      </div>
    </TwBlogLayout>
  );
};

const BlogWrapper = ({ allPosts, tags, years }: BlogProps) => {
  return (
    <NuqsAdapter>
      <Blog allPosts={allPosts} tags={tags} years={years} />
    </NuqsAdapter>
  );
};

export default BlogWrapper;
