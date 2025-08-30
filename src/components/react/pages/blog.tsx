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
  initialFilteredPosts?: PostListItem[];
  initialYear?: string | null;
  initialTag?: string | null;
  showYearsInitially?: boolean;
  showTagsInitially?: boolean;
}

const Blog = ({
  allPosts,
  tags,
  years,
  initialFilteredPosts = allPosts,
  initialYear = null,
  initialTag = null,
  showYearsInitially = false,
  showTagsInitially = false,
}: BlogProps) => {
  const [filteredPosts, setFilteredPosts] =
    useState<PostListItem[]>(initialFilteredPosts);
  const [queryTag] = useQueryState("tag");
  const [queryYear] = useQueryState("year");

  // Only update filtered posts when query params actually change from URL navigation
  useEffect(() => {
    if (!queryTag && !queryYear) {
      setFilteredPosts(allPosts);
      return;
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
    <TwBlogLayout
      tags={tags}
      years={years}
      allPosts={allPosts}
      showYearsInitially={showYearsInitially}
      showTagsInitially={showTagsInitially}
      initialYear={initialYear}
      initialTag={initialTag}
    >
      {/* posts list */}
      <div className="flex flex-col items-start gap-6">
        {filteredPosts.map((postItemData: PostListItem) => (
          <TwBlogListItem itemData={postItemData} key={postItemData.date} />
        ))}
      </div>
    </TwBlogLayout>
  );
};

const BlogWrapper = ({ allPosts, tags, years, ...restProps }: BlogProps) => {
  return (
    <NuqsAdapter>
      <Blog allPosts={allPosts} tags={tags} years={years} {...restProps} />
    </NuqsAdapter>
  );
};

export default BlogWrapper;
